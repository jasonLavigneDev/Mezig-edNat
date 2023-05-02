# Configuration

Copy `settings-development.json.sample` to `settings-development.json` and update values matching your configuration

## public:

| Key                                       | Type    | Default value | Description                  |
| ----------------------------------------- | ------- | ------------- | ---------------------------- |
| enableKeycloak                            | boolean | true          | If true, keycloak is enabled |
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

| Key              | Type    | Default value | Description                                |
| ---------------- | ------- | ------------- | ------------------------------------------ |
| fillWithFakeData | boolean | false         | If true, fake datas are generated at start |
