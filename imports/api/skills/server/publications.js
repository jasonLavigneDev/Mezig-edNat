import { FindFromPublication } from 'meteor/percolate:find-from-publication';
import Skills from '../skills';

FindFromPublication.publish('skills.all', function publishAllSkills() {
  if (this.userId !== null) {
    return Skills.find({});
  }
  return this.ready();
});

FindFromPublication.publish('skills.table.all', function publishAllSkillsTable() {
  return Skills.find({}, { sort: { count: -1 } });
});
