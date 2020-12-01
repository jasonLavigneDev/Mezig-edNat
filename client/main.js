import { Meteor } from 'meteor/meteor';
import { register, init, getLocaleFromNavigator } from 'svelte-i18n';
import App from '../imports/ui/App.svelte';

Meteor.startup(() => {
  register('en', () => import('../locales/en.json'));
  register('fr', () => import('../locales/fr.json'));

  init({
    fallbackLocale: 'fr',
    initialLocale: getLocaleFromNavigator(),
  });

  const app = new App({
    target: document.getElementById('app'),
  });
  return app;
});
