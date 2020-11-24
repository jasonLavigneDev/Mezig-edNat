import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

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
    },
    'skills.$': {
      type: String,
    },
    links: {
      type: Array,
      optional: true,
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
    },
  },
  { tracker: Tracker },
);

Mezigs.publicFields = {
  blacklist: 1,
  firstName: 1,
  lastName: 1,
  publicName: 1,
  username: 1,
  profilPic: 1,
  biography: 1,
  skills: 1,
  links: 1,
};

export default Mezigs;
