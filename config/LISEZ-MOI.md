# Configuration

Copier `settings-development.json.sample` dans `settings-development.json` et mettre à jour les valeurs correspondant à votre configuration.

## public:

| Key                                       | Type    | Default value | Description                  |
| ----------------------------------------- | ------- | ------------- | ---------------------------- |
| enableKeycloak                            | boolean | false         | Si true, keycloak est activé |
| keycloakUrl                               | string  | ""            | Keycloak URL                 |
| keycloakRealm                             | string  | ""            | Keycloak Realm               |
| laboiteURL                                | string  | ""            | Laboite URL                  |
| packages                                  | object  | {}            |                              |
| packages.dynamic-import                   | object  | {}            |                              |
| packages.dynamic-import.useLocationOrigin | boolean | true          |                              |

## keycloak:

| Key    | Type   | Default value | Description          |
| ------ | ------ | ------------- | -------------------- |
| pubkey | string | ""            | Keycloak public key  |
| client | string | "sso"         | Keycloak client type |

## private:

| Key              | Type    | Default value | Description                                                                      |
| ---------------- | ------- | ------------- | -------------------------------------------------------------------------------- |
| fillWithFakeData | boolean | false         | Si true, les fausses données sont générées au premier lancement de l'application |
