/* eslint-disable no-console */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import Mezigs from './mezigs/mezigs';
import Skills from './skills/skills';
import { updateSkillsCollection } from './utils';

if (Meteor.settings.private.fillWithFakeData) {
  let nbMezigsAdded = 0;

  const createMezig = (mezig) => {
    try {
      Mezigs.insert(mezig);
      nbMezigsAdded += 1;
    } catch (error) {
      console.log(`Insertion impossible de ${mezig.publicName} : ${error}`);
    }
  };

  const allSkills = Skills.find({}).fetch();
  let allSkillsNames = [];
  if (allSkills.length !== 0) {
    allSkillsNames = allSkills.map((s) => s.name);
  } else {
    allSkillsNames = [
      'python',
      'react',
      'svelte',
      'html',
      'javascript',
      'css',
      'java',
      'C++',
      'rust',
      'go',
      'cobol',
      'SQL',
      'docker',
      'git',
      'markdown',
    ];
  }

  const allLinks = [
    {
      label: 'Eole',
      URL: 'https://pcll.ac-dijon.fr/pcll/',
      isSocialNetwork: false,
      isPublic: true,
    },
    {
      label: 'twitter april',
      URL: 'https://twitter.com/aprilorg',
      isSocialNetwork: true,
      isPublic: true,
    },
    {
      label: 'April',
      URL: 'https://www.april.org/',
      isSocialNetwork: false,
      isPublic: true,
    },
    {
      label: 'Le Gouv',
      URL: 'https://legouv.fr/',
      isSocialNetwork: false,
      isPublic: false,
    },
    {
      label: 'Twitter EOLE',
      URL: 'https://twitter.com/poleeole',
      isSocialNetwork: true,
      isPublic: true,
    },
    {
      label: 'Mastodon EOLE',
      URL: 'https://mastodon.etalab.gouv.fr/@EOLE',
      isSocialNetwork: true,
      isPublic: false,
    },
    {
      label: 'Perdu',
      URL: 'http://perdu.com',
      isSocialNetwork: false,
      isPublic: true,
    },
    {
      label: 'le wifi ?',
      URL: 'http://www.lewifi.fr/',
      isSocialNetwork: false,
      isPublic: true,
    },
    {
      label: 'la wifi ?',
      URL: 'https://www.lawifi.fr/',
      isSocialNetwork: false,
      isPublic: true,
    },
  ];

  const allUsers = Meteor.users.find({}).fetch();
  if (Mezigs.find().count() < allUsers.length) {
    console.log('Add FakeDatas');
    allUsers.forEach((user) => {
      const mez = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username || `${user.firstName}.${user.lastName}`,
        publicName: user.username || `${user.firstName}.${user.lastName}`,
        email: user.emails[0].address,
        profilPic: user.avatar || '',
        biography: "Tout petit déjà, il n'était pas grand.",
        blacklist: Random.fraction() * 100 >= 90, // génère 10% de blacklist = true
        skills: [
          ...new Set([
            Random.choice(allSkillsNames),
            Random.choice(allSkillsNames),
            Random.choice(allSkillsNames),
            Random.choice(allSkillsNames),
            Random.choice(allSkillsNames),
            Random.choice(allSkillsNames),
            Random.choice(allSkillsNames),
            Random.choice(allSkillsNames),
            Random.choice(allSkillsNames),
            Random.choice(allSkillsNames),
          ]),
        ],
        links: [
          ...new Set([
            Random.choice(allLinks),
            Random.choice(allLinks),
            Random.choice(allLinks),
            Random.choice(allLinks),
            Random.choice(allLinks),
          ]),
        ],
        profileChecked: true,
      };
      createMezig(mez);
    });
    console.log(`${nbMezigsAdded} Mezigs added`);
    Skills.remove({}); // force un recalcul global des skills
    updateSkillsCollection();
  }
}
