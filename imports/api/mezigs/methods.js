import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Mezigs from './mezigs';

export const createMezig = new ValidatedMethod({
  name: 'mezigs.createMezig',
  validate: new SimpleSchema({
    data: Mezigs.schema.omit('blacklist', 'profilPic', 'biography', 'links', 'skills'),
  }).validator({ clean: true }),
  run({ data }) {
    // check if logged in
    if (!this.userId) {
      throw new Meteor.Error('api.mezigs.methods.createMezig.notLoggedIn', 'Erreur : utilisateur non connecté');
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
      throw new Meteor.Error('api.mezigs.methods.updateMezig.notLoggedIn', 'Erreur : utilisateur non connecté');
    }
    // check mezig existence
    const myzig = Mezigs.findOne({ _id: mezigId });
    if (myzig === undefined) {
      throw new Meteor.Error('api.mezigs.methods.updateMezig.notFound', 'Erreur : mezig inconnu');
    }
    return Mezigs.update({ _id: mezigId }, { $set: { ...data } });
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
      throw new Meteor.Error('api.mezigs.methods.removeMezig.notLoggedIn', 'Erreur : utilisateur non connecté');
    }
    // check mezig existence
    const myzig = Mezigs.findOne({ _id: mezigId });
    if (myzig === undefined) {
      throw new Meteor.Error('api.mezigs.methods.removeMezig.notFound', 'Erreur : mezig inconnu');
    }
    return Mezigs.remove({ _id: mezigId });
  },
});
