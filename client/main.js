import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';

Meteor.startup(() => {
  const app = new App({
    target: document.getElementById('app'),
  });
  return app;
});
