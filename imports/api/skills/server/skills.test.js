/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from 'chai';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import Skills from '../skills';
import './publications';
import updateSkills from './methods';

describe('skills', function () {
  describe('mutators', function () {
    it('builds correctly from factory', function () {
      const skill = Factory.create('skills');
      assert.typeOf(skill, 'object');
    });
  });
  describe('updateSkills', function () {
    beforeEach(function () {
      Skills.remove({});
    });
    it('does update skill correctly with multiple skills', function () {
      Factory.create('skills', { name: 'test1', count: 1 });
      Factory.create('skills', { name: 'test2', count: 2 });
      Factory.create('skills', { name: 'test3', count: 1 });

      const skillsToAdd = ['test1', 'test4'];
      const skillsToDelete = ['test2', 'test3'];

      updateSkills({ skillsToAdd, skillsToDelete });
      const skill1Find = Skills.findOne({ name: 'test1' });
      const skill2Find = Skills.findOne({ name: 'test2' });
      const skill3Find = Skills.findOne({ name: 'test3' });
      const skill4Find = Skills.findOne({ name: 'test4' });

      assert.typeOf(skill1Find, 'object');
      assert.equal(skill1Find.name, 'test1');
      assert.equal(skill1Find.count, 2);

      assert.typeOf(skill2Find, 'object');
      assert.equal(skill2Find.name, 'test2');
      assert.equal(skill2Find.count, 1);

      assert.typeOf(skill3Find, 'undefined');

      assert.typeOf(skill4Find, 'object');
      assert.equal(skill4Find.name, 'test4');
      assert.equal(skill4Find.count, 1);
    });
    it('does throw an error if skill to decrement does not exists', function () {
      assert.throws(
        () => {
          const skillsToAdd = [];
          const skillsToDelete = ['test1'];
          updateSkills({ skillsToAdd, skillsToDelete });
        },
        Meteor.Error,
        'api.skills.methods.updateSkills',
        'Ce skill n existe pas',
      );
    });
  });
});
