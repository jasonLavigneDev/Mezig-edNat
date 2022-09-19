# The DEV environment **Mezig** application :

- [Install](#install)
  - [Application : Laboite](#application-laboite)
  - [Application : Mezig](#application-mezig)
  - [Parameters](#parameters)
- [Run project](#run-project)
  - [In a terminal **laboite**](#in-a-terminal-laboite)
  - [Run an other terminal **mezig**](#run-an-other-terminal-mezig)
  - [Add groups to your user](#add-groups-to-your-user)
    - [In user interface **localhost:3000**](#in-user-interface-localhost3000)

---

## Install

### Application : Laboite

Install process :

```
git clone https://gitlab.mim-libre.fr/alphabet/laboite.git
cd laboite
cp config/settings.development.json.sample config/settings.development.json
cd app
meteor npm install
```

### Application : Mezig

Install process :

```
git clone https://gitlab.mim-libre.fr/alphabet/mezig.git
cd mezig
cp config/settings.development.json.sample config/settings.development.json
meteor npm install
```

### Parameters

To run **Mezig** locally, you need to configure a **LaBoite**' local instance with authentication on a Keycloak server. Add at least one API key in the private:apiKeys variable. See [configuration document for more informations](config/README.md).

## Run project

### In a terminal **laboite**

```
cd laboite/app
meteor npm start
```

It is possible to check the operation of the box by typing the following line from an web browser

```
http://localhost:3000
```

### Run an other terminal **mezig**

```
cd mezig
meteor npm start
```

From the browser, type this :

```
http://localhost:3020
```

### Add groups to your user

#### In user interface **localhost:3000**

From the `LaBoite` app that you access from the browser

```
http://localhost:3000
```

Go to the config file in LaBoite ./config/settings.development.json

Change the attribute : "whiteDomains" according to your mail provider.

Exemple :

For mailUser = 'toto@gmail.com', you must add "^gmail.com"

which would give :

    "whiteDomains": [
      "^ac-[a-z-]\\.fr",
      "^[a-z-]\\.gouv.fr",
      "^gmail.com"
    ]

Re run la boite

Go on `http://localhost:3000` (create your user in keycloak by following the link on the authentication page).

By going to the "Groups" tab, you can "Join Group" automatically for all groups in blue.

Refresh the page **Mezig** of browser

```
http://localhost:3020
```
