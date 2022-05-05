# Changelog

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
