import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import SimpleSchema from 'simpl-schema';
import i18n from 'meteor/universe:i18n';
import { _ } from 'meteor/underscore';
import { getLabel, isActive } from '../utils';
import Structures from './structures';

export const getAllChilds = new ValidatedMethod({
  name: 'structures.getAllChilds',
  validate: new SimpleSchema({
    structureId: { type: String, regEx: SimpleSchema.RegEx.Id, label: getLabel('api.structures.labels.id') },
  }).validator(),
  run({ structureId }) {
    const structure = Structures.findOne({ _id: structureId });

    if (structure === undefined) {
      throw new Meteor.Error(
        'api.structures.removeStructure.unknownStructure',
        i18n.__('api.structures.unknownStructure'),
      );
    }

    const authorized = isActive(this.userId);

    if (!authorized) {
      throw new Meteor.Error('api.structures.getAllChilds.notPermitted', i18n.__('api.users.notPermitted'));
    }

    const childs = Structures.find({ ancestorsIds: structureId }).fetch();
    return childs;
  },
});

export const getStructures = new ValidatedMethod({
  name: 'structures.getStructures',
  validate: null,
  run() {
    return Structures.find().fetch();
  },
});

export const getOneStructure = new ValidatedMethod({
  name: 'structures.getOneStructure',
  validate: new SimpleSchema({
    structureId: { type: String, regEx: SimpleSchema.RegEx.Id, label: getLabel('api.structures.labels.id') },
  }).validator(),
  run({ structureId }) {
    const structure = Structures.findOne({ _id: structureId });
    return structure;
  },
});

if (Meteor.isServer) {
  // Get list of all method names on Structures
  const LISTS_METHODS = _.pluck([getAllChilds, getStructures, getOneStructure], 'name');

  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule(
    {
      name(name) {
        return _.contains(LISTS_METHODS, name);
      },

      // Rate limit per connection ID
      connectionId() {
        return true;
      },
    },
    5,
    1000,
  );
}
