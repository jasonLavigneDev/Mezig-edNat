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

Factory.define('mezigs', Mezigs, {
  firstName: () => Random.id(),
  lastName: () => Random.id(),
  publicName: () => Random.id(),
  username: () => Random.id(),
});

Mezigs.attachSchema(Mezigs.schema);

export default Mezigs;
