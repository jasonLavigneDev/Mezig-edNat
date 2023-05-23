import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import '../imports/api/users/users';
import '../imports/api/users/methods';
import '../imports/api/users/server/publications';
import '../imports/api/mezigs/server/publications';
import '../imports/api/mezigs/methods';
import '../imports/api/importFakeData';
import '../imports/api/appsettings/appsettings';
import '../imports/api/appsettings/server/publications';
import '../imports/api/skills/server/publications';
import '../imports/api/structures/structures';
import '../imports/api/structures/methods';
import '../imports/api/structures/server/publications';

import { ServiceConfiguration } from 'meteor/service-configuration';
import SimpleSchema from 'simpl-schema';
import { updateSkillsCollection, updateAllStructures } from '../imports/api/utils';

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = 'validation-error';
  ddpError.details = error.details;
  return ddpError;
});

Meteor.startup(() => {
  // ensure admin role exists
  /* ensure all roles exist */
  const existingRoles = Roles.getAllRoles()
    .fetch()
    .map((role) => role._id);
  if (existingRoles.indexOf('admin') === -1) Roles.createRole('admin');
  if (Meteor.settings.public.laboiteUrl) {
    Accounts.onCreateUser(() => {
      // Users should not be created by mezig,
      // Redirect user to laboite
      throw new Meteor.Error('api.users.createUser', 'User creation is disabled in Mezig');
    });
  } else {
    Accounts.onCreateUser((options, user) => {
      // pass the structure name in the options
      const newUser = { ...user };
      if (user.services && user.services.keycloak) {
        /* eslint no-console:off */
        console.log('Creating new user after Keycloak authentication :');
        console.log(`  Keycloak id: ${user.services.keycloak.id}`);
        console.log(`  email: ${user.services.keycloak.email}`);
        newUser.emails = [{ address: user.services.keycloak.email, verified: true }];
      }
      if (options.firstName) newUser.firstName = options.firstName;
      if (options.lastName) newUser.lastName = options.lastName;
      if (options.structure) newUser.structure = options.structure;
      if (options.profile) newUser.profile = options.profile;
      return newUser;
    });
  }
  // code to run on server at startup (configure keycloak service)
  if (Meteor.settings.keycloak) {
    if (Meteor.settings.public.enableKeycloak === true) {
      Accounts.config({
        forbidClientAccountCreation: true,
      });
      ServiceConfiguration.configurations.upsert(
        { service: 'keycloak' },
        {
          $set: {
            loginStyle: 'redirect',
            serverUrl: Meteor.settings.public.keycloakUrl,
            realm: Meteor.settings.public.keycloakRealm,
            clientId: Meteor.settings.keycloak.client,
            realmPublicKey: Meteor.settings.keycloak.pubkey,
            bearerOnly: false,
          },
        },
      );
    } else if (!Meteor.settings.public.laboiteUrl) {
      // users can create their own account in Mezig if not linked to laboite
      // and keycloak authentication is disabled
      Accounts.config({ forbidClientAccountCreation: false });
    }

    updateSkillsCollection();
    updateAllStructures();
  }
});
