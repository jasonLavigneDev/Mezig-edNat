import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';

const Mezigs = new Mongo.Collection('mezigs');

// Deny all client-side updates since we will be using methods to manage this collection
Mezigs.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

Mezigs.schema = new SimpleSchema(
  {
    blacklist: {
      type: Boolean,
      optional: false,
      defaultValue: false,
    },
    firstName: {
      type: String,
      optional: true,
    },
    lastName: {
      type: String,
      optional: true,
    },
    username: {
      type: String,
      optional: false,
    },
    publicName: {
      type: String,
      unique: true,
    },
    profilPic: {
      type: String,
      optional: true,
    },
    biography: {
      type: String,
      optional: true,
    },
    skills: {
      type: Array,
      optional: true,
      defaultValue: [],
    },
    'skills.$': {
      type: String,
    },
    links: {
      type: Array,
      optional: true,
      defaultValue: [],
    },
    'links.$': {
      type: Object,
    },
    'links.$.label': {
      type: String,
    },
    'links.$.URL': {
      type: String,
    },
    'links.$.isSocialNetwork': {
      type: Boolean,
    },
    'links.$.isPublic': {
      type: Boolean,
      defaultValue: true,
    },
    profileChecked: {
      type: Boolean,
      defaultValue: false,
    },
  },
  { tracker: Tracker },
);

Mezigs.searchFields = {
  blacklist: 1,
  firstName: 1,
  lastName: 1,
  publicName: 1,
  profilPic: 1,
  skills: 1,
};

Mezigs.publicFields = {
  ...Mezigs.searchFields,
  biography: 1,
  links: 1,
};

Mezigs.selfFields = {
  ...Mezigs.publicFields,
  username: 1,
};

Factory.define('mezigs', Mezigs, {
  firstName: () => Random.id(),
  lastName: () => Random.id(),
  publicName: () => Random.id(),
  username: () => Random.id(),
});

Mezigs.attachSchema(Mezigs.schema);

if (Meteor.isServer) {
  // create or update Mezig data for current user
  Accounts.onLogin((details) => {
    if (details.type === 'keycloak') {
      // update data with keycloak info
      let mez = {};
      if (details.user.services.keycloak.given_name) {
        mez.firstName = details.user.services.keycloak.given_name;
      }
      if (details.user.services.keycloak.family_name) {
        mez.lastName = details.user.services.keycloak.family_name;
      }
      if (details.user.services.keycloak.preferred_username) {
        mez.username = details.user.services.keycloak.preferred_username;
      }
      // check if mezig already exists
      const currentMezig = Mezigs.findOne({ username: mez.username });
      if (currentMezig) {
        // update only basic informations
        if (
          currentMezig.username !== mez.username ||
          currentMezig.firstName !== mez.firstName ||
          currentMezig.lastName !== mez.lastName
        ) {
          Mezigs.update({ _id: currentMezig._id }, { $set: mez });
        }
      } else {
        // autocreate user, fetch additional data in users collection
        mez = {
          ...mez,
          // user laboite username as default publicName
          // if necessary, change to firstName.lastName and manage ducplicates
          publicName: details.user.username,
          profilPic: details.user.avatar || '',
          biography: '',
          blacklist: true,
          skills: [],
          links: [],
          profileChecked: false,
        };
        Mezigs.insert(mez);
      }
    }
  });
}

export default Mezigs;
