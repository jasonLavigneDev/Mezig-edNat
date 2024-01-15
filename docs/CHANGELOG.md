# Changelog

## [1.10.0](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.9.0...release/1.10.0) (2023-11-07)


### Features

* **libs:** update libs to wanted version ([d9b9f48](https://gitlab.mim-libre.fr/alphabet/mezig/commit/d9b9f48014ffda0148f51607d29a89c539b6df5d))
* **libs:** update node docker image ([cdf1799](https://gitlab.mim-libre.fr/alphabet/mezig/commit/cdf179983c5c4529875891ce322b52432a88d53b))
* **libs:** update version number of meteor base ([5b4a8ef](https://gitlab.mim-libre.fr/alphabet/mezig/commit/5b4a8efa811ce4bf73184d760571667743a3d6db))
* **matomo:** integrate Matomo client ([2c338e3](https://gitlab.mim-libre.fr/alphabet/mezig/commit/2c338e37e78ca9c6ca1116510d6d0926996029a4))
* **node:** change node version to previous version ([90f1a8e](https://gitlab.mim-libre.fr/alphabet/mezig/commit/90f1a8e54f7bcd4537c4fa1ef11e14d18899f91d))


### Bug Fixes

* **langpicker:** fix missing css attribut ([57182a5](https://gitlab.mim-libre.fr/alphabet/mezig/commit/57182a502b5e421223e8bc7f916bf8e21228af78))

## [1.9.0](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.8.0...release/1.9.0) (2023-08-24)


### Features

* **meteor:** change meteor base version ([4baa128](https://gitlab.mim-libre.fr/alphabet/mezig/commit/4baa128653d0fed784b36079c9996a0501909755))
* **search:** add search by structure ([5a4157a](https://gitlab.mim-libre.fr/alphabet/mezig/commit/5a4157a228f55946f6df31ed34c868de78dc4e1a))
* **search:** add search by structure on backend ([24da129](https://gitlab.mim-libre.fr/alphabet/mezig/commit/24da12913bd5227b997bd04d81707c08df71c879))
* **search:** add style for select structure filter ([a3bbb73](https://gitlab.mim-libre.fr/alphabet/mezig/commit/a3bbb7301fc1be936e034f83f894f0214d295c44))
* **structure:** add all used structure in search ([07cbd7a](https://gitlab.mim-libre.fr/alphabet/mezig/commit/07cbd7ad920d688b3d5dcac9cb599ddd2169316c))
* **structure:** add structure to profil ([368c519](https://gitlab.mim-libre.fr/alphabet/mezig/commit/368c519753bc1fb5f1c0763fa29e6d67078bcf51))
* **update:** auto update structures on startup ([bc31f41](https://gitlab.mim-libre.fr/alphabet/mezig/commit/bc31f4166254867e7a30e5f7071e3ad248faddab))


### Bug Fixes

* no structure in user ([79e2e22](https://gitlab.mim-libre.fr/alphabet/mezig/commit/79e2e22d7db76452192532888dfe48a7b6d138f6))
* **routing:** update svelte-routing library to latest version ([142c312](https://gitlab.mim-libre.fr/alphabet/mezig/commit/142c312e0605f48c0b8cd769169b6a9082669cf2))
* **search:** fix search on load more than 20 profils ([d6e895f](https://gitlab.mim-libre.fr/alphabet/mezig/commit/d6e895fc6a951f872b4e4ce49cb85c503c5f51d1))
* **search:** remove console log ([928e9ea](https://gitlab.mim-libre.fr/alphabet/mezig/commit/928e9eafce6410be8d1a517d2d08a1891204cdec))
* **settings:** enableKeycloak is true by default ([653ac58](https://gitlab.mim-libre.fr/alphabet/mezig/commit/653ac5804e16fb75fbff9a9aed41f442af3bf9ed))
* **skills:** better behavior when adding skill with # at start ([76a8e3b](https://gitlab.mim-libre.fr/alphabet/mezig/commit/76a8e3b5fa9b0651911caf0881dbb19d32f7e249))
* **structure:** set structure at account creation ([9fa1e6a](https://gitlab.mim-libre.fr/alphabet/mezig/commit/9fa1e6a2570861ef01cdcd1e70e100c9c1ad0286))
* **structures:** update search when selecting no structure ([9e10655](https://gitlab.mim-libre.fr/alphabet/mezig/commit/9e1065500338b70500a7319a69c24b32512dd790))
* **update:** rename variable ([0d7bc85](https://gitlab.mim-libre.fr/alphabet/mezig/commit/0d7bc858a462e1de72467823d041129a212a9cbe))


### Build System

* **meteor:** update meteor to 2.12 and meteor packages ([19288c0](https://gitlab.mim-libre.fr/alphabet/mezig/commit/19288c04934c47bf6794f0e515a600e87e133f27))

## [1.8.0](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.7.1...release/1.8.0) (2023-04-18)


### Features

* **input validation:** check content of string inputs ([90b6c45](https://gitlab.mim-libre.fr/alphabet/mezig/commit/90b6c45c48fbb418c63ce3de566d7dfe7868e538))


### Bug Fixes

* **audit:** sanitize html content before display ([ff22521](https://gitlab.mim-libre.fr/alphabet/mezig/commit/ff22521245eca45298133ff2496f77be1a7ed40e))
* **skills:** refactor updateSkills method into an internal function ([ca35a26](https://gitlab.mim-libre.fr/alphabet/mezig/commit/ca35a26d9ad4549b2fa3f676d04868cfcb4d0779))


### Continuous Integration

* **eslint:** rename import for prettier lib ([173801c](https://gitlab.mim-libre.fr/alphabet/mezig/commit/173801c02b3380857ed92b90ee9fd219ccf70b88))

### [1.7.1](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.7.0...release/1.7.1) (2023-01-30)


### Performance Improvements

* **skills:** create collection for skills ([6a53fbb](https://gitlab.mim-libre.fr/alphabet/mezig/commit/6a53fbbe07398760723a53b2eefa46ad07e6c2be))

## [1.7.0](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.6.1...release/1.7.0) (2022-09-19)


### Features

* **tags:** add tag cloud fontsize change ([68be5b1](https://gitlab.mim-libre.fr/alphabet/mezig/commit/68be5b18ad245873604a8d539483d19d5cb8ccca))


### Bug Fixes

* **skills:** skills with parenthesis are now found ([d753e35](https://gitlab.mim-libre.fr/alphabet/mezig/commit/d753e35cace98b92935f74c886f5178b1eb94253))
* **ui:** fix scroll in search page ([767e9ba](https://gitlab.mim-libre.fr/alphabet/mezig/commit/767e9bae2459e4516ad76dcb5b0425f26ee7aeca))


### Build System

* **meteor:** update meteor 2.7.3  and node version 14.19.3 ([4a6d000](https://gitlab.mim-libre.fr/alphabet/mezig/commit/4a6d000d59cff4c7681f01c37f62e637a6faa58a))
* **npm:** change port to 3020 ([6432603](https://gitlab.mim-libre.fr/alphabet/mezig/commit/64326034c5a3773c01d2d91b3de5451d9077d956))


### Documentation

* **readme:** update and translate readme ([89f6531](https://gitlab.mim-libre.fr/alphabet/mezig/commit/89f6531013a00be34d29b447bba285bd2ad3f540))


### Continuous Integration

* **build-docker:** run for `testing` prerelease ([41cc34a](https://gitlab.mim-libre.fr/alphabet/mezig/commit/41cc34ab4c364cabdcfc682b59aa63f78fcc086a))
* **commitlint:** use new standard job `.git:commitlint` ([a2a76d1](https://gitlab.mim-libre.fr/alphabet/mezig/commit/a2a76d19f4c23dc9414bad68f139ef867824bb81))
* **merge-to-dev:** use new standard jobs `.git:merge-to` ([f10276a](https://gitlab.mim-libre.fr/alphabet/mezig/commit/f10276a60f664c86f6f15f2d72b127e32e6bdb08))
* **meteor:** test before generating a new release ([a3001cd](https://gitlab.mim-libre.fr/alphabet/mezig/commit/a3001cdee8bab561b3acbcb544f45224f4bfa2d6))
* **semantic-release:** create `testing` prerelease ([244842e](https://gitlab.mim-libre.fr/alphabet/mezig/commit/244842e9d017f74e7c0e3dca91abc5a540e20b50))
* **tag docker:** tag `testing` prerelease image ([1fe3124](https://gitlab.mim-libre.fr/alphabet/mezig/commit/1fe31246156cacab4b730d6b37623dc340595141))

## [1.6.1](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.6.0...release/1.6.1) (2022-07-07)


### Bug Fixes

* **skill:** fix # input for skill in edit profile ([d5c8240](https://gitlab.mim-libre.fr/alphabet/mezig/commit/d5c82409d34eefdec7aec53659abb8f99e59f88f))
* **skills:** search on skills is now exact ([bd01d2c](https://gitlab.mim-libre.fr/alphabet/mezig/commit/bd01d2c2feb9e504e5516fac446f186f7685b6e9))

# [1.6.0](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.5.0...release/1.6.0) (2022-07-04)


### Bug Fixes

* **email:** fix email autocomplete in keycloak mode ([d3ac871](https://gitlab.mim-libre.fr/alphabet/mezig/commit/d3ac8717264b14e606dcc4df4e615e5575ff4326))
* **federationId:** no more server error on federationId calculation ([8ec641c](https://gitlab.mim-libre.fr/alphabet/mezig/commit/8ec641c97f65c2c6c9340e2bf4c2bb50ffcbbf17))
* **noaccount:** better display when no laboite account ([e125226](https://gitlab.mim-libre.fr/alphabet/mezig/commit/e12522635f1495fe94836696da04e81ad6e102f2))
* **search:** escaping regexp chars on search string ([b9788b6](https://gitlab.mim-libre.fr/alphabet/mezig/commit/b9788b67d1e2088eca20500413c05c893edab168))
* **skills:** escape # char in skills ([d259b9a](https://gitlab.mim-libre.fr/alphabet/mezig/commit/d259b9a9c9d7e911c2d20a9ddcc984774b90a91b))
* **skills:** fix tag autocomplete with spaces ([5c39511](https://gitlab.mim-libre.fr/alphabet/mezig/commit/5c395113f128809d7f13da47db4bfc5836261aa6))
* **tag:** fix remove tag from search ([67017c6](https://gitlab.mim-libre.fr/alphabet/mezig/commit/67017c6262597213836d035ca72370a91c19ddea))
* **tag:** search tag become case-insensitive ([2402bba](https://gitlab.mim-libre.fr/alphabet/mezig/commit/2402bba42c7197308fd579e5eb3840f774071b0f))
* **ui:** count of active users ([31358f7](https://gitlab.mim-libre.fr/alphabet/mezig/commit/31358f769de6cf1025a72487e754e9d77c211fa3))
* **ui:** modify css ans i18n in no account page ([1e0f02a](https://gitlab.mim-libre.fr/alphabet/mezig/commit/1e0f02ad03ba10c2870cb0d82347dc0fc0c6a076))
* **ui:** repair language picker when returning to home ([b068373](https://gitlab.mim-libre.fr/alphabet/mezig/commit/b068373a47ff94cf04fdc2c87117702e2cf26bbc))
* **ui:** use local font for material icon ([effb24b](https://gitlab.mim-libre.fr/alphabet/mezig/commit/effb24bca0572404e38a7def4721d7630c5a804a))


### Build System

* **meteor:** update meteor 2.7.2 ([bbfeb90](https://gitlab.mim-libre.fr/alphabet/mezig/commit/bbfeb902892932e520e16f895c2f44ffbe2a9f75))


### Features

* **profile:** fetch laboite email at profile creation ([8a57714](https://gitlab.mim-libre.fr/alphabet/mezig/commit/8a5771417032461d99728115e25f6ddc00dabed8))
* **skills:** add autocomplete list for skill input in profile ([79ac319](https://gitlab.mim-libre.fr/alphabet/mezig/commit/79ac3196b341d6f449e61c7d583b4931653fcf1d))
* **skills:** add backend method to get all skills ([3191b17](https://gitlab.mim-libre.fr/alphabet/mezig/commit/3191b17501b326c129e2e9199feca32a7107c6cc))
* **skills:** change color for new skills in profile ([6f8d80c](https://gitlab.mim-libre.fr/alphabet/mezig/commit/6f8d80c91fa15425bae6c90e6fdbe99406c3daba))
* **ui:** add tags display and selection ([ba5d74b](https://gitlab.mim-libre.fr/alphabet/mezig/commit/ba5d74b4e375a0b9f5b7b7e8a19cb71df993a1ff))
* **ui:** simplify implementation ([8761fc1](https://gitlab.mim-libre.fr/alphabet/mezig/commit/8761fc157e1c441a2f877865ba098d1fa7d18cf9))
* **ui:** simplify tags component ([7754aa9](https://gitlab.mim-libre.fr/alphabet/mezig/commit/7754aa9b4b4e089573990e9c517c0ae113cff717))

# [1.5.0](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.4.1...release/1.5.0) (2022-05-05)


### Bug Fixes

* **audit:** update Dockerfile and CI ([fcdd95f](https://gitlab.mim-libre.fr/alphabet/mezig/commit/fcdd95f8054f03366e55bb35e2fad201584cee9b))
* **audit:** update meteor and libraries ([847a3af](https://gitlab.mim-libre.fr/alphabet/mezig/commit/847a3af29f545bef3f9048642d83ee6a3c9472a7))
* **audit:** update to meteor 2.7.1 ([978ac0e](https://gitlab.mim-libre.fr/alphabet/mezig/commit/978ac0eecb7eb983417addc4a4cda5fd8e538c3a))
* **ui:** add i18n missing ([db53b11](https://gitlab.mim-libre.fr/alphabet/mezig/commit/db53b11f8e073b1ad2c3ee947ce9747799b5d25e))


### Code Refactoring

* **ui:** change logo and favicon ([c6e1de7](https://gitlab.mim-libre.fr/alphabet/mezig/commit/c6e1de7d26b6e86efd774a512905160af19fb42c))


### Features

* **ui:** add language picker in nav bar ([c7c5d22](https://gitlab.mim-libre.fr/alphabet/mezig/commit/c7c5d226cbd8bb18deca22fb159399a9e3fe921d))
* **ui:** add maintenance mode ([b550e04](https://gitlab.mim-libre.fr/alphabet/mezig/commit/b550e043ad9fdad216e9fb07a4508e099c7913d5))
* **ui:** redirect home with app icon ([dda7643](https://gitlab.mim-libre.fr/alphabet/mezig/commit/dda764308454e8aa314a4425f00f71295d906dff))

## [1.4.1](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.4.0...release/1.4.1) (2022-03-21)


### Bug Fixes

* **profile:** allow to open error/confirm dialog ([1cf390f](https://gitlab.mim-libre.fr/alphabet/mezig/commit/1cf390f74a8ec4cc426a18f867764db9ad048fc8))

# [1.4.0](https://gitlab.mim-libre.fr/alphabet/mezig/compare/release/1.3.1...release/1.4.0) (2022-01-13)


### Bug Fixes

* **avatar:** fix avatar size in nav bar ([abd34a1](https://gitlab.mim-libre.fr/alphabet/mezig/commit/abd34a1d5f1b59e1610158d9db2a82bfb04b8301))
* **browser:** fix tab title in browser ([1984bc8](https://gitlab.mim-libre.fr/alphabet/mezig/commit/1984bc876965a9e38790861b0ce0c379f94c4edd))
* **front:** fix some problems before deploying new version ([edfa154](https://gitlab.mim-libre.fr/alphabet/mezig/commit/edfa154f3b7b3207ac4de4fc421643c8098d670a))
* **gitlab-ci:** some globally defined keywords are deprecated ([bc5d784](https://gitlab.mim-libre.fr/alphabet/mezig/commit/bc5d784eab66a6bb0d8c55cfeb57301306c4f30f))
* **version:** merge from dev and update version number ([4164cb3](https://gitlab.mim-libre.fr/alphabet/mezig/commit/4164cb339aa38d711213d0077bf58a5374a1adea))


### Continuous Integration

* **build:** create the docker image and push it to `${CI_REGISTRY}` ([82bfb20](https://gitlab.mim-libre.fr/alphabet/mezig/commit/82bfb207a1fa2b31dfd8ae25e6b23c5910d68aba))
* **commitlint:** enforce commit message format ([c201749](https://gitlab.mim-libre.fr/alphabet/mezig/commit/c2017497e70600db506117c539c6d124c766f767))
* **release:** avoid regression in `dev` branch ([56155ff](https://gitlab.mim-libre.fr/alphabet/mezig/commit/56155ffad066d24a882261cacec90c87c05ca4c9))
* **release:** create release automatically with `semantic-release` ([76994b5](https://gitlab.mim-libre.fr/alphabet/mezig/commit/76994b560004bc3de73e4107453ebcdef37fc967))
* **release:** tag docker images based on release cycle ([e141b33](https://gitlab.mim-libre.fr/alphabet/mezig/commit/e141b3314f2d61b5982903d5332f0b72f597b929))
* **rules:** restrict execution to non stable branches by default ([723475d](https://gitlab.mim-libre.fr/alphabet/mezig/commit/723475d79019a860a941dcfca71ceacaa25f2362))
* **runners:** use OpenNebula runners with shared cache ([8780a3c](https://gitlab.mim-libre.fr/alphabet/mezig/commit/8780a3cbd27ec73cc5b2ddab7495f98fcc054a22))


### Features

* **profil:** Adding a button which copy the nextcloud address of the user ([c7bbe14](https://gitlab.mim-libre.fr/alphabet/mezig/commit/c7bbe14cf66db67ce36cbd1e7f8d396b013aec6b))


### Styles

* **gitlab-ci:** better self explanatory job names ([9079700](https://gitlab.mim-libre.fr/alphabet/mezig/commit/9079700b9c636086292131d67a2243ce21a34197))
