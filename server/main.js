import { Meteor } from 'meteor/meteor';
import '../imports/api/users/users';
import '../imports/api/users/server/publications';
import '../imports/api/mezig/server/publications';
import '../imports/api/importFakeData';
import { Accounts } from 'meteor/accounts-base';

import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {
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
    }
    Accounts.onCreateUser(() => {
      // FIXME : Users should not be created by mezig,
      //         Redirect user to laboite if not found
      throw new Meteor.Error('api.users.createUser', 'User creation is disabled in Mezig');
    });
    // server side login hook (update user based on keycloak included data)
    Accounts.onLogin((details) => {
      if (details.type === 'keycloak') {
        // update user informations from keycloak service data
        const updateInfos = {};
        if (details.user.services.keycloak.given_name) {
          updateInfos.firstName = details.user.services.keycloak.given_name;
        }
        if (details.user.services.keycloak.family_name) {
          updateInfos.lastName = details.user.services.keycloak.family_name;
        }
        if (details.user.services.keycloak.family_name) {
          updateInfos.emails = [{ address: details.user.services.keycloak.email, verified: true }];
        }
        if (
          details.user.services.keycloak.preferred_username &&
          details.user.services.keycloak.preferred_username !== details.user.username
        ) {
          // use preferred_username as username if defined
          // (should be set as mandatory in keycloak)
          updateInfos.username = details.user.services.keycloak.preferred_username;
        }
        Meteor.users.update({ _id: details.user._id }, { $set: updateInfos });
      }
    });
  }
});
