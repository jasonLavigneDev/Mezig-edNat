# Changelog

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
