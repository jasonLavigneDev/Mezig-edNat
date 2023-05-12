import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';
import Mezigs from './mezigs';
import getFavicon from '../getFavicon';
import updateSkills from '../skills/server/methods';
import { validateString } from '../utils';

Meteor.methods({
  'mezigs.checkProfile': function checkProfile() {
    const user = Meteor.users.findOne({ _id: this.userId });
    if (user) return (Mezigs.findOne({ username: user.username }) || { profileChecked: true }).profileChecked;
    return true;
  },
});

// Create a federation ID for the user if it's possible else make it undefined
export const getFedId = new ValidatedMethod({
  name: 'mezigs.getFedId',
  validate: new SimpleSchema({
    publicName: { type: String },
  }).validator({ clean: true }),
  run({ publicName }) {
    if (Mezigs.findOne({ publicName }).profileChecked) {
      const user = Meteor.users.findOne({ mezigName: publicName });
      if (user) {
        let fedId = '';
        if (user?.nclocator !== '' && user?.username !== '') {
          fedId = `${user.username}@${user.nclocator}`;
        }
        return fedId;
      }
    }
    return '';
  },
});

const validateMezig = (data) => {
  validateString(data.publicName);
  if (data.firstName) validateString(data.firstName);
  if (data.lastName) validateString(data.lastName);
  if (data.email) validateString(data.email);
  if (data.username) validateString(data.username);
  if (data.profilPic) validateString(data.profilPic);
  if (data.biography) validateString(data.biography);
  if (data.skills) {
    data.skills.forEach((skill) => validateString(skill));
  }
  if (data.links) {
    data.links.forEach((link) => {
      validateString(link.label);
      validateString(link.URL);
      if (link.favicon) validateString(link.favicon);
    });
  }
};

export const createMezig = new ValidatedMethod({
  name: 'mezigs.createMezig',
  validate: new SimpleSchema({
    data: Mezigs.schema.omit('blacklist', 'profilPic', 'biography', 'email', 'links', 'skills'),
  }).validator({ clean: true }),
  run({ data }) {
    // check if logged in
    if (!this.userId) {
      throw new Meteor.Error('api.mezigs.methods.createMezig.notLoggedIn', i18n.__('api.notLoggedIn'));
    }
    try {
      validateMezig(data);
      Mezigs.insert(data);
    } catch (error) {
      if (error.code === 11000) {
        throw new Meteor.Error('api.mezigs.createMezig.duplicateName', i18n.__('api.mezigs.alreadyExist'));
      } else {
        throw error;
      }
    }
  },
});

// export const updateProfilPic = new ValidatedMethod({
//   name: 'mezigs.updateProfilPic',
//   validate: new SimpleSchema({
//     userId: { type: String, regEx: SimpleSchema.RegEx.Id },
//     data: Mezigs.schema.omit('username', 'firstName', 'lastName'),
//   }).validator({ clean: true }),
//   run({ userId, data }) {
//     // check if logged in
//     console.log(userId, data);
//   },
// });

export const updateMezig = new ValidatedMethod({
  name: 'mezigs.updateMezig',
  validate: new SimpleSchema({
    mezigId: { type: String, regEx: SimpleSchema.RegEx.Id },
    data: Mezigs.schema.omit('username', 'firstName', 'lastName', 'structure'),
  }).validator({ clean: true }),
  async run({ mezigId, data }) {
    // check if logged in
    if (data.publicName.length < 3) {
      throw new Meteor.Error('api.mezigs.methods.updateMezig.shortPublicName', i18n.__('api.mezigs.nameTooShort'));
    }
    if (!this.userId) {
      throw new Meteor.Error('api.mezigs.methods.updateMezig.notLoggedIn', i18n.__('api.notLoggedIn'));
    }
    // check mezig existence
    const myzig = Mezigs.findOne({ _id: mezigId });
    if (myzig === undefined) {
      throw new Meteor.Error('api.mezigs.methods.updateMezig.notFound', i18n.__('api.mezigs.nameTooShort'));
    }
    const currentUser = Meteor.users.findOne(this.userId);
    // check if user is activated, if not admin user can only update it's own Mezig
    if (currentUser.isActive === false) {
      throw new Meteor.Error('api.mezigs.methods.updateMezig.validationNeeded', i18n.__('api.validationNeeded'));
    }
    if (myzig.username !== currentUser.username && !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('api.mezigs.methods.updateMezig.adminNeeded', i18n.__('api.adminNeeded'));
    }

    // update skills collection
    const { skills } = data;
    const mezig = Mezigs.findOne({ _id: mezigId }, { fields: { skills: 1 } });
    const oldSkills = mezig.skills;
    const skillsToAdd = [];
    const skillsToDelete = [];

    skills.forEach((skill) => {
      if (!oldSkills.includes(skill)) {
        skillsToAdd.push(skill);
      }
    });

    oldSkills.forEach((skill) => {
      if (!skills.includes(skill)) {
        skillsToDelete.push(skill);
      }
    });

    // get favicon for links
    // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
    const links = await Promise.all(
      data.links.map(async (link) => {
        let favicon;
        if (!link.favicon) {
          favicon = await getFavicon(link.URL);
        } else {
          favicon = link.favicon;
        }
        return { ...link, favicon };
      }),
    );
    const finalData = { ...data, links };

    validateMezig(finalData);
    updateSkills({ skillsToAdd, skillsToDelete });

    let mezigData = null;
    try {
      mezigData = Mezigs.update({ _id: mezigId }, { $set: { ...finalData } });
    } catch (error) {
      if (error.code === 11000) {
        throw new Meteor.Error(
          'api.mezigs.methods.updateMezig.duplicatePublicName',
          i18n.__('api.mezigs.alreadyExists.'),
        );
      } else {
        throw error;
      }
    }
    // add or remove publicName to Meteor.users collection
    try {
      const published = data.blacklist === false || (data.blacklist === undefined && myzig.blacklist === false);
      if (published === true) {
        Meteor.users.update({ username: myzig.username }, { $set: { mezigName: data.publicName || myzig.publicName } });
      } else {
        Meteor.users.update({ username: myzig.username }, { $unset: { mezigName: true } });
      }
    } catch (error) {
      throw new Meteor.Error('api.mezigs.methods.updateMezig.updateUserError', error.reason || error.message);
    }
    return mezigData;
  },
});

export const removeMezig = new ValidatedMethod({
  name: 'mezigs.removeMezig',
  validate: new SimpleSchema({
    mezigId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator({ clean: true }),
  run({ mezigId }) {
    // check if logged in
    if (!this.userId) {
      throw new Meteor.Error('api.mezigs.methods.removeMezig.notLoggedIn', i18n.__('api.notLoggedIn'));
    }
    // check mezig existence
    const myzig = Mezigs.findOne({ _id: mezigId });
    if (myzig === undefined) {
      throw new Meteor.Error('api.mezigs.methods.removeMezig.notFound', i18n.__('api.mezigs.notFound'));
    }
    updateSkills({ skillsToDelete: myzig.skills });
    return Mezigs.remove({ _id: mezigId });
  },
});

const specials = ['-', '/', '*', '+', '?', '.', '\\', '^', '$', '|', '(', ')'];
const regex = RegExp(`[${specials.join('\\')}]`, 'g');

// build query for all searched mezigs
const queryAllMezigs = ({ search, selectStructure = undefined }) => {
  const query = selectStructure
    ? { $and: [{ blacklist: false }, { structure: selectStructure }] }
    : { $and: [{ blacklist: false }] };

  const searchTab = search.split(' ');
  searchTab.forEach((searchWord) => {
    if (searchWord.startsWith('#')) {
      try {
        const skill = new RegExp(searchWord.slice(1).replace(regex, '\\$&').replace(/^/, '^').replace(/$/, '$'), 'i');
        query.$and.push({ skills: skill });
      } catch (error) {
        throw new Meteor.Error('api.mezigs.methods.getMezigs.NotRegExp', 'api.mezigs.invalidSearch');
      }
    } else {
      try {
        const reSearchWord = new RegExp(searchWord.replace(regex, '\\$&'));
        query.$and.push({
          $or: [
            { publicName: { $regex: reSearchWord, $options: 'i' } },
            { firstName: { $regex: reSearchWord, $options: 'i' } },
            { lastName: { $regex: reSearchWord, $options: 'i' } },
            { email: { $regex: reSearchWord, $options: 'i' } },
          ],
        });
      } catch (error) {
        throw new Meteor.Error('api.mezigs.methods.getMezigs.NotRegExp', 'api.mezigs.invalidSearch');
      }
    }
  });
  return query;
};

export const getMezigs = new ValidatedMethod({
  name: 'mezigs.getMezigs',
  validate: new SimpleSchema({
    page: { type: SimpleSchema.Integer, defaultValue: 1 },
    itemPerPage: { type: SimpleSchema.Integer, defaultValue: 10 },
    search: { type: String, defaultValue: '' },
    selectStructure: { type: String, defaultValue: undefined },
  }).validator({ clean: true }),
  run({ page, itemPerPage, search, selectStructure }) {
    console.log(selectStructure);
    const query = queryAllMezigs({ search, selectStructure });
    const total = Mezigs.find(query).count();
    const data = Mezigs.find(query, {
      fields: Mezigs.searchFields,
      skip: itemPerPage * (page - 1),
      limit: itemPerPage,
      sort: { publicName: 1 },
    }).fetch();
    return { total, data };
  },
});

Meteor.methods({
  'mezigs.publicProfileCount': function getAllMezigsCount() {
    const count = Mezigs.find({ blacklist: false }).count();
    return count;
  },
});

// Meteor.methods({
//   'mezigs.getAllData': function getAllData() {
//     const data = Mezigs.find().fetch();
//     return data;
//   },
// });
