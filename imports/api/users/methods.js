import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';
import { isActive } from '../utils';

const activateUser = new ValidatedMethod({
  name: 'users.activate',
  validate: new SimpleSchema({
    username: { type: String },
    active: Boolean,
  }).validator(),

  run({ username, active }) {
    // check if current user has global admin rights
    const authorized = isActive(this.userId) && Roles.userIsInRole(this.userId, 'admin');
    if (!authorized) {
      throw new Meteor.Error('api.users.activateUser.notPermitted', i18n.__('api.adminNeeded'));
    }
    // check user existence
    const user = Meteor.users.findOne({ username });
    if (user === undefined) {
      throw new Meteor.Error('api.users.setActive.unknownUser', i18n.__('api.users.unknownUser'));
    }
    Meteor.users.update(user._id, { $set: { isActive: active } });
  },
});

export default activateUser;
