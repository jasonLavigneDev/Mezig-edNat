import { Meteor } from 'meteor/meteor';
import Mezigs from '../mezigs';

Meteor.methods({
  'mezigs.getAllSkills': function getAllSkills() {
    const allSkills = [];
    const mezigs = Mezigs.find({}, { fields: { skills: 1 } }).fetch();

    mezigs.forEach(function (u) {
      u.skills.forEach(function (s) {
        if (!allSkills.includes(s)) {
          allSkills.push(s);
        }
      });
    });
    allSkills.sort();
    return allSkills;
  },
});
