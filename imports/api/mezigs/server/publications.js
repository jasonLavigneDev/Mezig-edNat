import { Meteor } from 'meteor/meteor';
import Mezigs from '../mezigs';

// publish all mezigs to client (no links, for search page)
Meteor.publish('mezigs.whitelist', function publishAllUsers() {
  return Mezigs.find(
    { blacklist: false },
    {
      fields: Mezigs.searchFields,
      limit: 10000,
      sort: { lastName: 1 },
    },
  );
});

// publish one mezig profle to client
Meteor.publish('mezigs.profile', function publishOneUser({ publicName }) {
  if (this.userId !== null) {
    console.log('publish profile for ', publicName);
    return Mezigs.find(
      { blacklist: false, publicName },
      {
        fields: Mezigs.publicFields,
        limit: 1,
        sort: { lastName: 1 },
      },
    );
  }
  // anonymous access to profile
  const self = this;
  const mezigsHandle = Mezigs.find(
    { blacklist: false, publicName },
    {
      fields: Mezigs.publicFields,
      limit: 1,
      sort: { lastName: 1 },
    },
  ).observeChanges({
    added(id, fields) {
      const links = fields.links.filter((link) => link.isPublic === true);
      self.added('mezigs', id, { ...fields, links });
    },
    changed(id, fields) {
      const links = fields.links.filter((link) => link.isPublic === true);
      self.changed('mezigs', id, { ...fields, links });
    },
    removed(id) {
      self.removed('mezigs', id);
    },
  });

  self.onStop(function onstop() {
    mezigsHandle.stop();
  });
  return self.ready();
});
