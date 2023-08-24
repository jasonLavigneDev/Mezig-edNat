import { Meteor } from 'meteor/meteor';
import { FindFromPublication } from 'meteor/percolate:find-from-publication';
import Mezigs from '../mezigs';

// publish currrent user profile to client
Meteor.publish('mezigs.self', function publishSelf() {
  if (this.userId !== null) {
    const { username } = Meteor.users.findOne(this.userId);
    return Mezigs.find(
      { username },
      {
        fields: Mezigs.selfFields,
        limit: 1,
        sort: { lastName: 1 },
      },
    );
  }
  return this.ready();
});

// publish one mezig profile to client
Meteor.publish('mezigs.profile', function publishOneUser({ publicName }) {
  if (this.userId !== null) {
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
Meteor.publish('mezigs.allPublish', function publishAllForSearch() {
  return Mezigs.find();
});

FindFromPublication.publish('mezigs.all', function publishAll() {
  if (this.userId !== null) {
    return Mezigs.find({});
  }
  return this.ready();
});

FindFromPublication.publish('mezigs.table.all', function publishAllTable() {
  return Mezigs.find({ blacklist: false });
});
