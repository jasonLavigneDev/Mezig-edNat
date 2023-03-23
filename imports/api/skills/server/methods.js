import { Meteor } from 'meteor/meteor';
import Skills from '../skills';

function updateSkills(skillsToUpdate) {
  const skillsToIncrement = skillsToUpdate.skillsToAdd || [];
  const skillsToDecrement = skillsToUpdate.skillsToDelete || [];

  if (skillsToIncrement.length > 0) {
    skillsToIncrement.forEach((skill) => {
      const skillFind = Skills.findOne({ name: skill.toString() });
      if (!skillFind) return Skills.insert({ name: skill.toString(), count: 1 });
      return Skills.update({ _id: skillFind._id }, { $inc: { count: 1 } });
    });
  }

  if (skillsToDecrement.length > 0) {
    skillsToDecrement.forEach((skill) => {
      const skillFind = Skills.findOne({ name: skill.toString() });
      if (!skillFind)
        throw new Meteor.Error('api.skills.methods.updateSkills', `Unknown skill to remove : ${skill.toString()}`);
      if (skillFind.count === 1) return Skills.remove({ name: skill.toString() });
      return Skills.update({ name: skill.toString() }, { $inc: { count: -1 } });
    });
  }
}

export default updateSkills;
