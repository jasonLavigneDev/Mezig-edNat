/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { assert } from 'chai';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';
import { Random } from 'meteor/random';
import { Factory } from 'meteor/dburles:factory';
import Mezigs from '../mezigs';
import './publications';
import { createMezig, updateMezig, removeMezig, getMezigs } from '../methods';
import Skills from '../../skills/skills';

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
    let adminId;
    let mezigId;
    let mezigData;
    let mezigAdminData;
    beforeEach(function () {
      Meteor.roleAssignment.remove({});
      Meteor.users.remove({});
      Meteor.roles.remove({});
      Mezigs.remove({});
      Roles.createRole('admin');

      // Generate 'user'
      userId = Random.id();
      const userData = {
        _id: userId,
        firstName: 'Léo',
        lastName: 'Moscillo',
        username: 'ollicsom',
      };
      Meteor.users.insert(userData);
      // Generate admin user
      adminId = Random.id();
      const adminData = {
        _id: adminId,
        firstName: 'Admin',
        lastName: 'Admin',
        username: 'admin',
      };
      Meteor.users.insert(adminData);
      Roles.addUsersToRoles(adminId, 'admin');
      mezigData = {
        firstName: 'Léo',
        lastName: 'Moscillo',
        username: 'ollicsom',
        publicName: 'ollicsom',
      };
      mezigAdminData = {
        firstName: 'Cmoi',
        lastName: 'Ladmin',
        username: 'admin',
        publicName: 'bofh',
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
      it('does update current user mezig', async function () {
        mezigId = Factory.create('mezigs', mezigData)._id;
        await updateMezig._execute({ userId }, { mezigId, data: { ...mezigData, publicName: 'toto' } });
        const reqMezig = Mezigs.findOne({ _id: mezigId });
        assert.typeOf(reqMezig, 'object');
        assert.equal(reqMezig.publicName, 'toto');
      });
      it("does update another user mezig if you're admin", async function () {
        mezigId = Factory.create('mezigs', mezigData)._id;
        await updateMezig._execute({ userId: adminId }, { mezigId, data: { ...mezigData, publicName: 'toto' } });
        const reqMezig = Mezigs.findOne({ _id: mezigId });
        assert.typeOf(reqMezig, 'object');
        assert.equal(reqMezig.publicName, 'toto');
      });
      it("does not update a mezig if you're not logged in", function (done) {
        mezigId = Factory.create('mezigs', mezigData)._id;
        updateMezig._execute({}, { mezigId, data: mezigData }).catch((e) => {
          try {
            assert.equal(e.errorType, 'Meteor.Error');
            assert.equal(e.error, 'api.mezigs.methods.updateMezig.notLoggedIn');
          } catch (assertionError) {
            done(assertionError); // this will fail properly the test
            return; // this prevents from calling twice done()
          }
          done();
        });
      });
      it("does not update another mezig if you're not admin", function (done) {
        const mezigAdminId = Factory.create('mezigs', mezigAdminData)._id;
        updateMezig._execute({ userId }, { mezigId: mezigAdminId, data: mezigData }).catch((e) => {
          try {
            assert.equal(e.errorType, 'Meteor.Error');
            assert.equal(e.error, 'api.mezigs.methods.updateMezig.adminNeeded');
          } catch (assertionError) {
            done(assertionError); // this will fail properly the test
            return; // this prevents from calling twice done()
          }
          done();
        });
      });
      it('throw error if mezig to update is not found', function (done) {
        updateMezig._execute({ userId }, { mezigId: Random.id(), data: mezigData }).catch((e) => {
          try {
            assert.equal(e.errorType, 'Meteor.Error');
            assert.equal(e.error, 'api.mezigs.methods.updateMezig.notFound');
          } catch (assertionError) {
            done(assertionError); // this will fail properly the test
            return; // this prevents from calling twice done()
          }
          done();
        });
      });
      it('does not update if mezig to update has an already used publicName', async function (done) {
        Factory.create('mezigs', { publicName: 'toto' });
        mezigId = Factory.create('mezigs', mezigData)._id;
        updateMezig._execute({ userId }, { mezigId, data: { ...mezigData, publicName: 'toto' } }).catch((e) => {
          try {
            assert.equal(e.errorType, 'Meteor.Error');
            assert.equal(e.error, 'api.mezigs.methods.updateMezig.duplicatePublicName');
          } catch (assertionError) {
            done(assertionError); // this will fail properly the test
            return; // this prevents from calling twice done()
          }
          done();
        });
      });
    });
    describe('removeMezig', function () {
      it('does remove a mezig', function () {
        mezigId = Factory.create('mezigs', mezigData)._id;
        assert.typeOf(Mezigs.findOne({ _id: mezigId }), 'object');
        removeMezig._execute({ userId: adminId }, { mezigId });
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
            removeMezig._execute({ userId: adminId }, { mezigId: Random.id() });
          },
          Meteor.Error,
          /api.mezigs.methods.removeMezig.notFound/,
        );
      });
      it('does update skills when remove a mezig', function () {
        Factory.create('skills', { name: 'tata', count: 3 });
        Factory.create('skills', { name: 'titi', count: 2 });
        Factory.create('skills', { name: 'toto', count: 1 });
        let allSkills = Skills.find().fetch();
        mezigId = Factory.create('mezigs', { ...mezigData, skills: ['tata', 'titi', 'toto'] })._id;
        const mez = Mezigs.findOne({ _id: mezigId });
        assert.isObject(mez);
        assert.isArray(mez.skills);
        assert.lengthOf(mez.skills, 3);
        assert.lengthOf(allSkills, 3);
        removeMezig._execute({ userId: adminId }, { mezigId });
        assert.equal(Mezigs.findOne({ _id: mezigId }), undefined);
        allSkills = Skills.find().fetch();
        assert.lengthOf(allSkills, 2);
        assert.equal(Skills.findOne({ name: 'tata' }).count, 2);
        assert.equal(Skills.findOne({ name: 'titi' }).count, 1);
        assert.isNotObject(Skills.findOne({ name: 'toto' }));
      });
      it('throw error if mezig to remove has unknown skill', function () {
        assert.throws(
          () => {
            mezigId = Factory.create('mezigs', { ...mezigData, skills: ['toto'] })._id;
            removeMezig._execute({ userId: adminId }, { mezigId });
          },
          Meteor.Error,
          /api.skills.methods.updateSkills/,
        );
      });
    });
    describe('mezigs.getMezigs', function () {
      beforeEach(function () {
        _.times(4, () => {
          Factory.create('mezigs', { skills: ['svelte'] });
        });
        _.times(4, () => {
          Factory.create('mezigs', { firstName: `yoyo${Random.id()}` });
        });
        Factory.create('mezigs', { firstName: 'yoyo', skills: ['svelte'] });
      });
      it('sends all mezigs with empty search string', function () {
        const res = getMezigs._execute({}, { page: 1, itemPerPage: 20, search: '' });
        assert.equal(res.total, 9);
        assert.equal(res.data.length, 9);
      });
      it('sends all mezigs with userId and empty search string', function () {
        const res = getMezigs._execute({ userId }, { page: 1, itemPerPage: 20, search: '' });
        assert.equal(res.total, 9);
        assert.equal(res.data.length, 9);
      });
      it('sends first page of mezigs with empty search string', function () {
        const res = getMezigs._execute({}, { page: 1, itemPerPage: 5, search: '' });
        assert.equal(res.total, 9);
        assert.equal(res.data.length, 5);
      });
      it('sends second page of mezigs with empty search string', function () {
        const res = getMezigs._execute({}, { page: 2, itemPerPage: 5, search: '' });
        assert.equal(res.total, 9);
        assert.equal(res.data.length, 4);
      });
      it('sends mezigs with search string = "yoyo"', function () {
        const res = getMezigs._execute({}, { page: 1, itemPerPage: 20, search: 'yoyo' });
        assert.equal(res.total, 5);
        assert.equal(res.data.length, 5);
      });
      it('sends mezigs with search string = "#svelte"', function () {
        const res = getMezigs._execute({}, { page: 1, itemPerPage: 20, search: '#svelte' });
        assert.equal(res.total, 5);
        assert.equal(res.data.length, 5);
      });
      it('sends mezigs with search string = "yoyo #svelte"', function () {
        const res = getMezigs._execute({}, { page: 1, itemPerPage: 20, search: 'yoyo #svelte' });
        assert.equal(res.total, 1);
        assert.equal(res.data.length, 1);
      });
      it('sends mezigs with search string = "noresults"', function () {
        const res = getMezigs._execute({}, { page: 1, itemPerPage: 20, search: 'noresults' });
        assert.equal(res.total, 0);
        assert.equal(res.data.length, 0);
      });
    });
    describe('mezigs.publicProfileCount', function () {
      it('does count not blacklist mezigs', function () {
        _.times(4, () => {
          Factory.create('mezigs');
        });
        Factory.create('mezigs', { blacklist: true });
        const nbMezigs = Meteor.call('mezigs.publicProfileCount');
        assert.equal(nbMezigs, 4);
      });
    });
  });
});
