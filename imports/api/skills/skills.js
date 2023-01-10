/* eslint-disable func-names */
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';

const Skills = new Mongo.Collection('skills');

// Deny all client-side updates since we will be using methods to manage this collection
Skills.deny({
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

Skills.schema = new SimpleSchema(
  {
    name: {
      type: String,
      index: true,
      unique: true,
    },
    count: {
      type: Number,
      min: 0,
    },
  },
  { clean: { removeEmptyStrings: false }, tracker: Tracker },
);

Skills.publicFields = {
  name: 1,
  count: 1,
};

Factory.define('skills', Skills, {
  name: () => Random.id(),
  count: () => 2,
});

Skills.attachSchema(Skills.schema);

export default Skills;
