import { Meteor } from 'meteor/meteor';
import Mezigs from '../mezig';

// publish all mezigs to client
Meteor.publish('mezigs.whitelist', function publishAllUsers() {
  if (this.userId !== null) {
    return Mezigs.find(
      { blacklist: false },
      {
        fields: Mezigs.publicFields,
        limit: 10000,
        sort: { lastName: 1 },
      }
    );
  } else {
    const self = this;
    const mezigsHandle = Mezigs.find(
      { blacklist: false },
      {
        fields: Mezigs.publicFields,
        limit: 10000,
        sort: { lastName: 1 },
      }
    ).observeChanges({
      added: function (id, fields) {
        const links = fields.links.filter((link) => link.isPublic === true);
        self.added('mezigs', id, { ...fields, links });
      },
      changed: function (id, fields) {
        const links = fields.links.filter((link) => link.isPublic === true);
        self.changed('mezigs', id, { ...fields, links });
      },
      removed: function (id) {
        self.removed('mezigs', id);
      },
    });
    self.ready();

    self.onStop(function () {
      mezigsHandle.stop();
    });
  }
});
