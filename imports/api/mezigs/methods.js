import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

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
    data: Mezigs.schema.omit('blacklist', 'profilPic', 'biography', 'links', 'skills'),
  }).validator({ clean: true }),
  run({ data }) {
    // check if logged in
    if (!this.userId) {
      throw new Meteor.Error('api.mezigs.methods.createMezig.notLoggedIn', 'You must be logged in.');
    }
    Mezigs.insert(data);
  },
});

export const updateMezig = new ValidatedMethod({
  name: 'mezigs.updateMezig',
  validate: new SimpleSchema({
    mezigId: { type: String, regEx: SimpleSchema.RegEx.Id },
    data: Mezigs.schema.omit('username', 'firstName', 'lastName'),
  }).validator({ clean: true }),
  run({ mezigId, data }) {
    // check if logged in
    if (!this.userId) {
      throw new Meteor.Error('api.mezigs.methods.updateMezig.notLoggedIn', 'You must be logged in.');
    }
    // check mezig existence
    const myzig = Mezigs.findOne({ _id: mezigId });
    if (myzig === undefined) {
      throw new Meteor.Error('api.mezigs.methods.updateMezig.notFound', 'Mezig not found.');
    }
    try {
      return Mezigs.update({ _id: mezigId }, { $set: { ...data } });
    } catch (error) {
      if (error.code === 11000) {
        throw new Meteor.Error('api.mezigs.methods.updateMezig.duplicatePublicName', 'PublicName already exits.');
      } else {
        throw error;
      }
    }
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
      throw new Meteor.Error('api.mezigs.methods.removeMezig.notLoggedIn', 'You must be logged in.');
    }
    // check mezig existence
    const myzig = Mezigs.findOne({ _id: mezigId });
    if (myzig === undefined) {
      throw new Meteor.Error('api.mezigs.methods.removeMezig.notFound', 'Mezig not found.');
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
