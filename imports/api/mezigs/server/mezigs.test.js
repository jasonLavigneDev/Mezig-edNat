/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { assert } from 'chai';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import Mezigs from '../mezigs';
import './publications';
import { createMezig, updateMezig, removeMezig } from '../methods';

describe('mezig', function () {
  describe('mutators', function () {
    it('builds correctly from factory', function () {
      const mezig = Factory.create('mezigs');
      assert.typeOf(mezig, 'object');
    });
  });

  describe('publications', function () {
    let userId;
    before(function () {
      Meteor.users.remove({});

      // Generate 'user'
      userId = Random.id();
      const userData = {
        _id: userId,
        firstName: 'Léo',
        lastName: 'Moscillo',
        username: 'ollicsom',
      };
      Meteor.users.insert(userData);

      Mezigs.remove({});
      _.times(2, () => {
        Factory.create('mezigs');
      });
      Factory.create('mezigs', { username: 'ollicsom' });
      Factory.create('mezigs', { publicName: 'toto' });
      Factory.create('mezigs', { blacklist: true });
    });
    describe('mezigs.whitelist', function () {
      it('sends all mezigs', function (done) {
        const collector = new PublicationCollector({});
        collector.collect('mezigs.whitelist', (collections) => {
          assert.equal(collections.mezigs.length, 4);
          done();
        });
      });
    });
    describe('mezigs.self', function () {
      it('sends currrent user mezig', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('mezigs.self', (collections) => {
          assert.equal(collections.mezigs.length, 1);
          assert.equal(collections.mezigs[0].username, 'ollicsom');
          done();
        });
      });
    });
    describe('mezigs.profile', function () {
      it('sends one mezig profile', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('mezigs.profile', { publicName: 'toto' }, (collections) => {
          assert.equal(collections.mezigs.length, 1);
          assert.equal(collections.mezigs[0].publicName, 'toto');
          done();
        });
      });
    });
  });

  describe('methods', function () {
    let userId;
    let mezigId;
    let mezigData;
    beforeEach(function () {
      Meteor.users.remove({});
      Mezigs.remove({});

      // Generate 'user'
      userId = Random.id();
      const userData = {
        _id: userId,
        firstName: 'Léo',
        lastName: 'Moscillo',
        username: 'ollicsom',
      };
      Meteor.users.insert(userData);

      mezigData = {
        firstName: 'Léo',
        lastName: 'Moscillo',
        username: 'ollicsom',
        publicName: 'ollicsom',
      };
    });
    describe('createMezig', function () {
      it('does create a mezig', function () {
        createMezig._execute({ userId }, { data: mezigData });
        const reqMezig = Mezigs.findOne({ publicName: 'ollicsom' });
        assert.typeOf(reqMezig, 'object');
      });
      it("does not create a mezig if you're not logged in", function () {
        assert.throws(
          () => {
            createMezig._execute({}, { data: mezigData });
          },
          Meteor.Error,
          /api.mezigs.methods.createMezig.notLoggedIn/,
        );
      });
    });
    describe('updateMezig', function () {
      it('does update a mezig', function () {
        mezigId = Factory.create('mezigs', mezigData)._id;
        updateMezig._execute({ userId }, { mezigId, data: { ...mezigData, publicName: 'toto' } });
        const reqMezig = Mezigs.findOne({ _id: mezigId });
        assert.typeOf(reqMezig, 'object');
        assert.equal(reqMezig.publicName, 'toto');
      });
      it("does not update a mezig if you're not logged in", function () {
        assert.throws(
          () => {
            mezigId = Factory.create('mezigs', mezigData)._id;
            updateMezig._execute({}, { mezigId, data: mezigData });
          },
          Meteor.Error,
          /api.mezigs.methods.updateMezig.notLoggedIn/,
        );
      });
      it('throw error if mezig to update is not found', function () {
        assert.throws(
          () => {
            updateMezig._execute({ userId }, { mezigId: Random.id(), data: mezigData });
          },
          Meteor.Error,
          /api.mezigs.methods.updateMezig.notFound/,
        );
      });
      it('does not update if mezig to update has an already used publicName', function () {
        assert.throws(
          () => {
            Factory.create('mezigs', { publicName: 'toto' });
            mezigId = Factory.create('mezigs', mezigData)._id;
            updateMezig._execute({ userId }, { mezigId, data: { ...mezigData, publicName: 'toto' } });
          },
          Meteor.Error,
          /api.mezigs.methods.updateMezig.duplicatePublicName/,
        );
      });
    });
    describe('removeMezig', function () {
      it('does remove a mezig', function () {
        mezigId = Factory.create('mezigs', mezigData)._id;
        assert.typeOf(Mezigs.findOne({ _id: mezigId }), 'object');
        removeMezig._execute({ userId }, { mezigId });
        assert.equal(Mezigs.findOne({ _id: mezigId }), undefined);
      });
      it("does not remove a mezig if you're not logged in", function () {
        assert.throws(
          () => {
            mezigId = Factory.create('mezigs', mezigData)._id;
            removeMezig._execute({}, { mezigId });
          },
          Meteor.Error,
          /api.mezigs.methods.removeMezig.notLoggedIn/,
        );
      });
      it('throw error if mezig to remove is not found', function () {
        assert.throws(
          () => {
            removeMezig._execute({ userId }, { mezigId: Random.id() });
          },
          Meteor.Error,
          /api.mezigs.methods.removeMezig.notFound/,
        );
      });
    });
  });
});
