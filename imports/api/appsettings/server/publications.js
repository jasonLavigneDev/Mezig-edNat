import { Meteor } from 'meteor/meteor';
import AppSettings from '../appsettings';

// publish settings
Meteor.publish('appsettings.all', () => {
  const { publicFields } = AppSettings;
  return AppSettings.find({ _id: 'settings' }, { fields: publicFields, sort: { _id: 1 }, limit: 1 });
});
