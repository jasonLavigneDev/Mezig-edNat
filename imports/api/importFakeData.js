import Mezigs from './mezig/mezig';
import fakeData from '../../fakeData.json';

function createCategorie(mezigs) {
  Mezigs.insert(mezigs);
}

if (Mezigs.find().count() === 0) {
  console.log('bdd vide');
  fakeData.map((mezigs) => createCategorie(mezigs));
}
