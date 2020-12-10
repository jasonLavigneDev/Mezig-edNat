import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import Mezigs from './mezigs/mezigs';
import fakeData from '../../fakeData.json';

let nbMezgigsAdded = 0;

function createMezig(mezig) {
  try {
    Mezigs.insert(mezig);
    nbMezgigsAdded += 1;
  } catch (error) {
    console.log(`Insertion impossible de ${mezig.publicName} : ${error}`);
  }
}

const allSkills = [
  'python',
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

const allLinks = [
  {
    label: 'Eole',
    URL: 'https://pcll.ac-dijon.fr/pcll/',
    isSocialNetwork: false,
    isPublic: true,
  },
  {
    label: 'twitter',
    URL: 'https://twitter.com/luc.bourdot',
    isSocialNetwork: true,
    isPublic: true,
  },
  {
    label: 'Portfolio',
    URL: 'https://moscilloleo.fr',
    isSocialNetwork: false,
    isPublic: true,
  },
  {
    label: 'Discover',
    URL: 'https://moscilloleo.fr/Discover',
    isSocialNetwork: false,
    isPublic: false,
  },
  {
    label: 'Twitter',
    URL: 'https://twitter.com/ollicsom',
    isSocialNetwork: true,
    isPublic: true,
  },
  {
    label: 'Instagram',
    URL: 'https://instagram.com/ollicsom',
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

if (Mezigs.find().count() <= 10) {
  console.log('Add FakeDatas');
  fakeData.map((mezigs) => createMezig(mezigs));
  const allUsers = Meteor.users.find({}).fetch();
  allUsers.forEach((user) => {
    const mez = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username || `${user.firstName}.${user.lastName}`,
      publicName: user.username || `${user.firstName}.${user.lastName}`,
      profilPic: user.avatar || '',
      biography: "Tout petit déjà, il n'était pas grand.",
      blacklist: Random.fraction() * 100 >= 90, // génère 10% de blacklist = true
      skills: [Random.choice(allSkills), Random.choice(allSkills), Random.choice(allSkills), Random.choice(allSkills)],
      links: [Random.choice(allLinks), Random.choice(allLinks), Random.choice(allLinks), Random.choice(allLinks)],
    };
    createMezig(mez);
  });
  console.log(`${nbMezgigsAdded} Mezgig added`);
}
