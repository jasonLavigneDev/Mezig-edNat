import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';

import faviconoclast from 'faviconoclast';
import i18n from 'meteor/universe:i18n';
import Mezigs from './mezigs';

Meteor.methods({
  'mezigs.checkProfile': function checkProfile() {
    const user = Meteor.users.findOne({ _id: this.userId });
    if (user) return (Mezigs.findOne({ username: user.username }) || { profileChecked: true }).profileChecked;
    return true;
  },
});

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
    data: Mezigs.schema.omit('username', 'firstName', 'lastName'),
  }).validator({ clean: true }),
  run({ mezigId, data }) {
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
    // get favicon for links
    data.links.forEach((link, i) => {
      if (!link.favicon) {
        const wrappedGetFavicon = Meteor.wrapAsync(faviconoclast);
        try {
          // eslint-disable-next-line no-param-reassign
          data.links[i].favicon = wrappedGetFavicon(link.URL);
        } catch (error) {
          console.log(`api.mezigs.methods.updateMezig`, error);
        }
      }
    });

    let mezigData = null;
    try {
      mezigData = Mezigs.update({ _id: mezigId }, { $set: { ...data } });
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
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('api.mezigs.methods.removeMezig.adminNeeded', i18n.__('api.adminNeeded'));
    }
    // check mezig existence
    const myzig = Mezigs.findOne({ _id: mezigId });
    if (myzig === undefined) {
      throw new Meteor.Error('api.mezigs.methods.removeMezig.notFound', i18n.__('api.mezigs.notFound'));
    }
    return Mezigs.remove({ _id: mezigId });
  },
});

// build query for all searched mezigs
const regexSkills = /#/;
const queryAllMezigs = ({ search }) => {
  const query = { $and: [{ blacklist: false }] };
  for (let i = 0; i < search.split(' ').length; i += 1) {
    if (regexSkills.test(search.split(' ')[i])) {
      query.$and.push({ skills: search.split(' ')[i].split('#')[1] });
    } else {
      const nameRegExp = search.split(' ')[i];
      query.$and.push({
        $or: [
          { publicName: { $regex: nameRegExp, $options: 'i' } },
          { firstName: { $regex: nameRegExp, $options: 'i' } },
          { lastName: { $regex: nameRegExp, $options: 'i' } },
          { email: { $regex: nameRegExp, $options: 'i' } },
        ],
      });
    }
  }
  return query;
};

export const getMezigs = new ValidatedMethod({
  name: 'mezigs.getMezigs',
  validate: new SimpleSchema({
    page: { type: SimpleSchema.Integer, defaultValue: 1 },
    itemPerPage: { type: SimpleSchema.Integer, defaultValue: 10 },
    search: { type: String, defaultValue: '' },
  }).validator({ clean: true }),
  run({ page, itemPerPage, search }) {
    const query = queryAllMezigs({ search });
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

// Meteor.methods({
//   'mezigs.getAllData': function getAllData() {
//     const data = Mezigs.find().fetch();
//     return data;
//   },
// });
