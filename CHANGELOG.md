# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.45.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.44.3...1.45.0) (2025-07-20)


### Features

* allow user to customize separator when using prepend/append ([#204](https://github.com/Vinzent03/obsidian-advanced-uri/issues/204)) ([46af7e4](https://github.com/Vinzent03/obsidian-advanced-uri/commit/46af7e448f9ecbb12d265d85c2cadc790bfdabf2))


### Bug Fixes

* update nested frontmatter ([#206](https://github.com/Vinzent03/obsidian-advanced-uri/issues/206)) ([e564815](https://github.com/Vinzent03/obsidian-advanced-uri/commit/e564815c60381607fa53b321a1457005735af630))
* use core daily-notes api ([4bc36cc](https://github.com/Vinzent03/obsidian-advanced-uri/commit/4bc36cc9718763be82831f6a6cb656c95786ae74)), closes [#202](https://github.com/Vinzent03/obsidian-advanced-uri/issues/202)

### [1.44.3](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.44.2...1.44.3) (2024-12-31)


### Bug Fixes

* handle blocks case insensitive ([f2ae357](https://github.com/Vinzent03/obsidian-advanced-uri/commit/f2ae357b4ebacdc85a60c1a3fea526927c2e7051)), closes [#192](https://github.com/Vinzent03/obsidian-advanced-uri/issues/192)

### [1.44.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.44.1...1.44.2) (2024-11-07)


### Bug Fixes

* enable plugin ([d9b581d](https://github.com/Vinzent03/obsidian-advanced-uri/commit/d9b581dddbfb98c023994c7a640d21638497ecd6))

### [1.44.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.44.0...1.44.1) (2024-08-30)


### Bug Fixes

* encode vault parameter ([26376d7](https://github.com/Vinzent03/obsidian-advanced-uri/commit/26376d77c1aeb11bc0693f96a11229fbd760b51a)), closes [#186](https://github.com/Vinzent03/obsidian-advanced-uri/issues/186)

## [1.44.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.43.0...1.44.0) (2024-08-28)


### Features

* new shorter action string without doubled encoding ([026d8e2](https://github.com/Vinzent03/obsidian-advanced-uri/commit/026d8e2736b3b19b76bfdd57b0fbaa4f956fac4f))


### Bug Fixes

* open without viewmode parameter ([8fdb789](https://github.com/Vinzent03/obsidian-advanced-uri/commit/8fdb7890ab2119632567f987bcf15e8241a4fdd0))

## [1.43.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.42.0...1.43.0) (2024-08-25)


### Features

* add confirm parameter to command uris ([147be01](https://github.com/Vinzent03/obsidian-advanced-uri/commit/147be01e2dafa51867a66c7854d32eb2634cdfa4)), closes [#174](https://github.com/Vinzent03/obsidian-advanced-uri/issues/174)
* center cursor in line ([e941beb](https://github.com/Vinzent03/obsidian-advanced-uri/commit/e941beb8bd968f8f41c0ce37e176379b9c4c22ef)), closes [#183](https://github.com/Vinzent03/obsidian-advanced-uri/issues/183)
* copy URI for current workspace ([58f92ea](https://github.com/Vinzent03/obsidian-advanced-uri/commit/58f92eaafa12999c8df08196d4802a860503a207)), closes [#42](https://github.com/Vinzent03/obsidian-advanced-uri/issues/42)
* set cursor at offset ([0d450ca](https://github.com/Vinzent03/obsidian-advanced-uri/commit/0d450ca3270753ad6114f07146a73fe401ce3add)), closes [#181](https://github.com/Vinzent03/obsidian-advanced-uri/issues/181)
* support openmode for command without file ([42df2cc](https://github.com/Vinzent03/obsidian-advanced-uri/commit/42df2cc85ec9048908f61b8cf4afe16e286cf917)), closes [#163](https://github.com/Vinzent03/obsidian-advanced-uri/issues/163)

## [1.42.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.41.0...1.42.0) (2024-08-01)


### Features

* canvas support ([6bf24ea](https://github.com/Vinzent03/obsidian-advanced-uri/commit/6bf24eae66e3dce9a41129c76354eaec23ff8ced)), closes [#177](https://github.com/Vinzent03/obsidian-advanced-uri/issues/177)
* set cursor to column in line ([414277d](https://github.com/Vinzent03/obsidian-advanced-uri/commit/414277d0edef26348aaed6998e879519fca055c9)), closes [#173](https://github.com/Vinzent03/obsidian-advanced-uri/issues/173)


### Bug Fixes

* ignore window openmode on mobile ([03e7005](https://github.com/Vinzent03/obsidian-advanced-uri/commit/03e7005fa35e3aae21c9e66edb90a7f956384633)), closes [#169](https://github.com/Vinzent03/obsidian-advanced-uri/issues/169)
* remove useless console.log ([4db3143](https://github.com/Vinzent03/obsidian-advanced-uri/commit/4db314317af3a13a16cf043636c4561e1c2117d3))

## [1.41.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.40.1...1.41.0) (2024-07-07)


### Features

* add command to copy workspace URI ([31a61b9](https://github.com/Vinzent03/obsidian-advanced-uri/commit/31a61b91d650a2cee99e4f4e359f16ffc762e50e)), closes [#42](https://github.com/Vinzent03/obsidian-advanced-uri/issues/42)
* allow appending / prepending at line ([a564d0b](https://github.com/Vinzent03/obsidian-advanced-uri/commit/a564d0ba237c0d5613a0ab1d3ff048c596b11c02))
* improve `updateplugins` ([#166](https://github.com/Vinzent03/obsidian-advanced-uri/issues/166)) ([697b0ba](https://github.com/Vinzent03/obsidian-advanced-uri/commit/697b0baa9e5d0d3d4fd300aeffd9e2bcaec7157d))


### Bug Fixes

* append after empty line and fix prepend with frontmatter ([45f29f1](https://github.com/Vinzent03/obsidian-advanced-uri/commit/45f29f1a711bcb2c6dec6a64aa60ebae5399fe98))
* change window openmode on mobile to true ([204be8a](https://github.com/Vinzent03/obsidian-advanced-uri/commit/204be8a94299d3739737ef5803990b386233f99c)), closes [#169](https://github.com/Vinzent03/obsidian-advanced-uri/issues/169)
* detect sections correctly ([#175](https://github.com/Vinzent03/obsidian-advanced-uri/issues/175)) ([a869f27](https://github.com/Vinzent03/obsidian-advanced-uri/commit/a869f27af99274e6b2040d9df6cbad9f59bddb42))
* Missing capitalization of command names ([6d20433](https://github.com/Vinzent03/obsidian-advanced-uri/commit/6d204335008640cb5357bb363c18b7cbc74d3fbd))

### [1.40.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.40.0...1.40.1) (2024-04-09)


### Bug Fixes

* prepend text to empty file ([b4a3f3a](https://github.com/Vinzent03/obsidian-advanced-uri/commit/b4a3f3a65fac2994d1c5db4f7268fecc51c4779f))

## [1.40.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.39.1...1.40.0) (2024-02-03)


### Features

* write to specific frontmatter fields ([73e6388](https://github.com/Vinzent03/obsidian-advanced-uri/commit/73e6388716c6b02ae8db7a87adca5c73df5ef9fa))

### [1.39.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.39.0...1.39.1) (2024-02-01)


### Bug Fixes

* prepend with frontmatter ([fb39d06](https://github.com/Vinzent03/obsidian-advanced-uri/commit/fb39d0655041da6a14a9c8fa37259d91d7b75e3d)), closes [#148](https://github.com/Vinzent03/obsidian-advanced-uri/issues/148)
* support enable and disable core plugin ([c9b05af](https://github.com/Vinzent03/obsidian-advanced-uri/commit/c9b05af3b7bdbcd9ae8e3a61cee3d856c1b836c8))

## [1.39.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.38.1...1.39.0) (2024-02-01)


### Features

* add toggle to exclude vault param, and specify name or vault ID ([#153](https://github.com/Vinzent03/obsidian-advanced-uri/issues/153)) ([209160e](https://github.com/Vinzent03/obsidian-advanced-uri/commit/209160efec46235f8317a9f0c8e7a241a4a5261d))

### [1.38.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.38.0...1.38.1) (2023-08-30)


### Bug Fixes

* use existing empty frontmatter key for uid ([f07c035](https://github.com/Vinzent03/obsidian-advanced-uri/commit/f07c035e3f6d007bb005056390c1b010836564c0)), closes [#144](https://github.com/Vinzent03/obsidian-advanced-uri/issues/144)

## [1.38.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.37.0...1.38.0) (2023-08-24)


### Features

* search whole vault for block id ([91108e6](https://github.com/Vinzent03/obsidian-advanced-uri/commit/91108e685f18a723a0c6837ce97313923396c408)), closes [#141](https://github.com/Vinzent03/obsidian-advanced-uri/issues/141)

## [1.37.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.36.5...1.37.0) (2023-08-07)


### Features

* use block/heading nav and search in one ([7581613](https://github.com/Vinzent03/obsidian-advanced-uri/commit/7581613e921a268ca514014a89cd05f9bc500f42)), closes [#135](https://github.com/Vinzent03/obsidian-advanced-uri/issues/135)

### [1.36.5](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.36.4...1.36.5) (2023-07-30)


### Bug Fixes

* allow block and heading in popover openmode ([40227a3](https://github.com/Vinzent03/obsidian-advanced-uri/commit/40227a36e7cb306607619c4868fa2efff5cbe942)), closes [#137](https://github.com/Vinzent03/obsidian-advanced-uri/issues/137)

### [1.36.4](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.36.3...1.36.4) (2023-07-17)


### Bug Fixes

* wait for metadata indexing when getting uid ([fd2a223](https://github.com/Vinzent03/obsidian-advanced-uri/commit/fd2a22340a4958677b0ede78c19c067c2394f75f))

### [1.36.3](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.36.2...1.36.3) (2023-06-27)


### Bug Fixes

* only add frontmatter to canvas files ([9d6672a](https://github.com/Vinzent03/obsidian-advanced-uri/commit/9d6672a3ba755ce22b30cc1356f2c205c34f962c)), closes [#131](https://github.com/Vinzent03/obsidian-advanced-uri/issues/131)

### [1.36.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.36.1...1.36.2) (2023-06-03)


### Bug Fixes

* support numbers as frontmatter uid ([0a0c409](https://github.com/Vinzent03/obsidian-advanced-uri/commit/0a0c4096fc00f4ab5fa63c915c04d56e14a8e542))

### [1.36.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.36.0...1.36.1) (2023-06-02)


### Bug Fixes

* open file with uid ([4ff8b93](https://github.com/Vinzent03/obsidian-advanced-uri/commit/4ff8b93b606f320ac6a45e455643efc64f30e674))

## [1.36.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.35.0...1.36.0) (2023-05-31)


### Features

* support list of uids fin frontmatter ([e564f2f](https://github.com/Vinzent03/obsidian-advanced-uri/commit/e564f2f712209ebedd5020d1a880263136c256dd)), closes [#127](https://github.com/Vinzent03/obsidian-advanced-uri/issues/127)

## [1.35.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.34.0...1.35.0) (2023-04-15)


### Features

* bookmark support ([32fd56b](https://github.com/Vinzent03/obsidian-advanced-uri/commit/32fd56b6bd83b021d1c37db75040c7f46b87710e)), closes [#113](https://github.com/Vinzent03/obsidian-advanced-uri/issues/113)

## [1.34.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.33.3...1.34.0) (2023-03-30)


### Features

* set line and switch to reading/preview mode ([917a4eb](https://github.com/Vinzent03/obsidian-advanced-uri/commit/917a4eb5d193e721817bfa770a0d126824b4ad98)), closes [#91](https://github.com/Vinzent03/obsidian-advanced-uri/issues/91)

### [1.33.3](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.33.2...1.33.3) (2023-03-18)


### Bug Fixes

* focus heading in current file ([2adddab](https://github.com/Vinzent03/obsidian-advanced-uri/commit/2adddab38ce95e6ee23a8081d8b8c0460e3dda21))

### [1.33.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.33.1...1.33.2) (2023-03-17)


### Bug Fixes

* better use for 'true' openmode ([d4d802f](https://github.com/Vinzent03/obsidian-advanced-uri/commit/d4d802f8936f90724d3eea8a688a80ea38ca2c26))

### [1.33.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.33.0...1.33.1) (2023-03-17)


### Bug Fixes

* use openmode correctly ([fd7dde8](https://github.com/Vinzent03/obsidian-advanced-uri/commit/fd7dde8754c9ff6d318bd614fe05341971a5c9e8)), closes [#118](https://github.com/Vinzent03/obsidian-advanced-uri/issues/118)

## [1.33.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.32.0...1.33.0) (2023-02-20)


### Features

* eval parameter ([025bb92](https://github.com/Vinzent03/obsidian-advanced-uri/commit/025bb9201ef7ca840ef5d4efea7fd8aefc960bea)), closes [#114](https://github.com/Vinzent03/obsidian-advanced-uri/issues/114)

## [1.32.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.31.3...1.32.0) (2023-02-10)


### Features

* navigate to setting section ([e2dd57d](https://github.com/Vinzent03/obsidian-advanced-uri/commit/e2dd57d8380a4d79f5c56c88cdd1746be83696ea)), closes [#110](https://github.com/Vinzent03/obsidian-advanced-uri/issues/110)

### [1.31.3](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.31.2...1.31.3) (2023-02-05)


### Bug Fixes

* don't focus existing pane on silent mode ([d6edfbd](https://github.com/Vinzent03/obsidian-advanced-uri/commit/d6edfbdac3be412b3c21f68ce3414046505edd02)), closes [#106](https://github.com/Vinzent03/obsidian-advanced-uri/issues/106)
* open existing tab if possible ([e98b03d](https://github.com/Vinzent03/obsidian-advanced-uri/commit/e98b03def89cb09ff96ce011b91940676a63318e)), closes [#98](https://github.com/Vinzent03/obsidian-advanced-uri/issues/98)
* show copy advanced uri in file options ([e38c8f4](https://github.com/Vinzent03/obsidian-advanced-uri/commit/e38c8f4a64ec2f0dfc0e96238ee3f2c4b16125fe))

### [1.31.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.31.1...1.31.2) (2022-12-17)


### Bug Fixes

* copy file uri in other view types ([0303ded](https://github.com/Vinzent03/obsidian-advanced-uri/commit/0303dedf1f3ce032c7e05b2f2a447e35a24fb1d1)), closes [#97](https://github.com/Vinzent03/obsidian-advanced-uri/issues/97)

### [1.31.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.31.0...1.31.1) (2022-11-26)


### Bug Fixes

* block ref creation for list items ([49d2714](https://github.com/Vinzent03/obsidian-advanced-uri/commit/49d2714e8023e9bb6a7c0fa7fe3c62c16c0eefa6)), closes [#89](https://github.com/Vinzent03/obsidian-advanced-uri/issues/89)

## [1.31.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.30.0...1.31.0) (2022-11-25)


### Features

* search ([52a2f4c](https://github.com/Vinzent03/obsidian-advanced-uri/commit/52a2f4c6b9ba382b54a8b272c39aa217c275e56b)), closes [#90](https://github.com/Vinzent03/obsidian-advanced-uri/issues/90)


### Bug Fixes

* set source mode line navigation ([e1079a3](https://github.com/Vinzent03/obsidian-advanced-uri/commit/e1079a395ce5e296b7d2a71118a209041fcdb95f)), closes [#91](https://github.com/Vinzent03/obsidian-advanced-uri/issues/91)

## [1.30.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.29.2...1.30.0) (2022-11-23)


### Features

* add filepath when using uid ([eca15a2](https://github.com/Vinzent03/obsidian-advanced-uri/commit/eca15a2efa3a83c64583e849fef43998dcf632c3)), closes [#86](https://github.com/Vinzent03/obsidian-advanced-uri/issues/86)
* create block reference via command ([f7f37cb](https://github.com/Vinzent03/obsidian-advanced-uri/commit/f7f37cb64ff2f1e379ff1f64e0c19b1e990e181b)), closes [#89](https://github.com/Vinzent03/obsidian-advanced-uri/issues/89)

### [1.29.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.29.1...1.29.2) (2022-11-10)


### Bug Fixes

* openmode popover ([7a69e31](https://github.com/Vinzent03/obsidian-advanced-uri/commit/7a69e313cade68b733a1037b99c493bfde5c99cc))

### [1.29.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.29.0...1.29.1) (2022-11-08)


### Bug Fixes

* open file when writing to existing file ([4bf9e97](https://github.com/Vinzent03/obsidian-advanced-uri/commit/4bf9e972b350f5a0413cbbb7c29d3f2e00922c58)), closes [#88](https://github.com/Vinzent03/obsidian-advanced-uri/issues/88)

## [1.29.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.28.2...1.29.0) (2022-11-08)


### Features

* specify openmode ([dfc8f6b](https://github.com/Vinzent03/obsidian-advanced-uri/commit/dfc8f6bebe5a6de244e6b1f98cc4febf9f84b800)), closes [#79](https://github.com/Vinzent03/obsidian-advanced-uri/issues/79)

### [1.28.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.28.1...1.28.2) (2022-10-14)


### Bug Fixes

* encode vault parameter properly ([cf53f48](https://github.com/Vinzent03/obsidian-advanced-uri/commit/cf53f4850d11a0807b0a22f9100d73172d603b53)), closes [#83](https://github.com/Vinzent03/obsidian-advanced-uri/issues/83)

### [1.28.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.28.0...1.28.1) (2022-10-13)


### Bug Fixes

* encode vault parameter ([a683686](https://github.com/Vinzent03/obsidian-advanced-uri/commit/a6836868b20f78ce65ffbac6b7f17e9ff445b2f0)), closes [#62](https://github.com/Vinzent03/obsidian-advanced-uri/issues/62)

## [1.28.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.27.2...1.28.0) (2022-09-30)


### Features

* cache last uri parameters ([825150c](https://github.com/Vinzent03/obsidian-advanced-uri/commit/825150c2fd018265f400fa712b1a933303b3557f)), closes [#77](https://github.com/Vinzent03/obsidian-advanced-uri/issues/77)

### [1.27.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.27.1...1.27.2) (2022-09-28)


### Bug Fixes

* set cursor in already opened pane ([c51d3ef](https://github.com/Vinzent03/obsidian-advanced-uri/commit/c51d3ef03c67e4aa8e0f656c92043506b10ec12d)), closes [#81](https://github.com/Vinzent03/obsidian-advanced-uri/issues/81)

### [1.27.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.27.0...1.27.1) (2022-09-26)


### Bug Fixes

* support mode=new on ([14736c1](https://github.com/Vinzent03/obsidian-advanced-uri/commit/14736c12dd4cfde084a0acb4cecccd4519278c84)), closes [#71](https://github.com/Vinzent03/obsidian-advanced-uri/issues/71)

## [1.27.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.26.1...1.27.0) (2022-09-15)


### Features

* set cursor in command call ([3a544ee](https://github.com/Vinzent03/obsidian-advanced-uri/commit/3a544eedaf468dd685bc93db6b95f8c9a8396bae)), closes [#76](https://github.com/Vinzent03/obsidian-advanced-uri/issues/76)

### [1.26.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.26.0...1.26.1) (2022-09-06)

## [1.26.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.25.1...1.26.0) (2022-09-06)


### Features

* copy frontmatter value to clipboard ([64b0596](https://github.com/Vinzent03/obsidian-advanced-uri/commit/64b0596b866b05e21a9f5cf2638682a7cb20c602)), closes [#68](https://github.com/Vinzent03/obsidian-advanced-uri/issues/68)

### [1.25.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.25.0...1.25.1) (2022-09-06)

## [1.25.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.24.0...1.25.0) (2022-09-06)


### Features

* donate button in settings ([4352657](https://github.com/Vinzent03/obsidian-advanced-uri/commit/43526578acb3d2aaa5d98b48e80c630146910a50))
* enable and disable plugin ([35f685b](https://github.com/Vinzent03/obsidian-advanced-uri/commit/35f685b1000ef3cda6f9b56f40de64f94ef31846))


### Bug Fixes

* copy uri in file menu obs 0.16 ([d766f05](https://github.com/Vinzent03/obsidian-advanced-uri/commit/d766f05eb49f915b9e75f7d869266c735362eb21)), closes [#72](https://github.com/Vinzent03/obsidian-advanced-uri/issues/72)

## [1.24.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.23.0...1.24.0) (2022-07-21)


### Features

* write content from clipboard ([07ed921](https://github.com/Vinzent03/obsidian-advanced-uri/commit/07ed92195c06c6c3e6acf381360fb08fc06792dd))

## [1.23.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.22.0...1.23.0) (2022-06-09)


### Features

* skip file selection in simple uri generation ([de2e904](https://github.com/Vinzent03/obsidian-advanced-uri/commit/de2e9041f5938214e22a6dfa2054a20eb3b50963))

## [1.22.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.21.1...1.22.0) (2022-05-26)


### Features

* add simpler copy uri for file command ([1a84aca](https://github.com/Vinzent03/obsidian-advanced-uri/commit/1a84aca18d33977c40096948756cc800d8785d38)), closes [#57](https://github.com/Vinzent03/obsidian-advanced-uri/issues/57)

### [1.21.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.21.0...1.21.1) (2022-03-24)


### Bug Fixes

* race condition for frontmatter parsing ([5dbd063](https://github.com/Vinzent03/obsidian-advanced-uri/commit/5dbd063cac7900fea62808bdacd6e8d16910a437))

## [1.21.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.20.1...1.21.0) (2022-03-24)


### Features

* add newpane parameter ([cf2dd3c](https://github.com/Vinzent03/obsidian-advanced-uri/commit/cf2dd3c29aebb0925e28861b7a35c684e3e81a66)), closes [#50](https://github.com/Vinzent03/obsidian-advanced-uri/issues/50)
* file creation with filename follows user preferences ([b4682f7](https://github.com/Vinzent03/obsidian-advanced-uri/commit/b4682f7e1dc9e96764a81eb73761905b1b43f21e))


### Bug Fixes

* write file in non existent sub folder ([f75713d](https://github.com/Vinzent03/obsidian-advanced-uri/commit/f75713dbbd9e027b7e144b48df2d96aed7e21b3a))

### [1.20.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.20.0...1.20.1) (2022-03-09)


### Bug Fixes

* get uid from frontmatter ([12f8076](https://github.com/Vinzent03/obsidian-advanced-uri/commit/12f80761585d7c9bf71f4e3bfb438e739bba5b1a))

## [1.20.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.19.0...1.20.0) (2022-03-03)


### Features

* create file with uid when file doesn't exists ([367775a](https://github.com/Vinzent03/obsidian-advanced-uri/commit/367775ac7cee2c576d2f986d9d4e61815e9602bc)), closes [#49](https://github.com/Vinzent03/obsidian-advanced-uri/issues/49)
* return file uri on hook action ([a7378a1](https://github.com/Vinzent03/obsidian-advanced-uri/commit/a7378a1d6f137a77a20ac2bfad234e3ae319e728))

## [1.19.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.18.0...1.19.0) (2022-03-02)


### Features

* Hook to new support ([b2b7108](https://github.com/Vinzent03/obsidian-advanced-uri/commit/b2b71084c36fe0d7970cd781fbef269621a7f2c7))


### Bug Fixes

* append to heading of daily note ([015bd7c](https://github.com/Vinzent03/obsidian-advanced-uri/commit/015bd7c35315f24f5cdac79adf98d875dbb17731)), closes [#48](https://github.com/Vinzent03/obsidian-advanced-uri/issues/48)

## [1.18.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.17.0...1.18.0) (2022-02-28)


### Features

* add Hook support ([daf9d56](https://github.com/Vinzent03/obsidian-advanced-uri/commit/daf9d56fe6317f3e1e6e5bea3b74abd69d5ef793)), closes [#46](https://github.com/Vinzent03/obsidian-advanced-uri/issues/46)

## [1.17.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.16.1...1.17.0) (2022-01-04)


### Features

* support live preview as view mode ([786fcff](https://github.com/Vinzent03/obsidian-advanced-uri/commit/786fcff1d45a171adf39589c1f215409f993ed90))


### Bug Fixes

* call checkCallback correctly ([9cb2c21](https://github.com/Vinzent03/obsidian-advanced-uri/commit/9cb2c2152daef069d2f25a2ea863f41f1757c5d0))
* support line parameter for writing too ([b5f6508](https://github.com/Vinzent03/obsidian-advanced-uri/commit/b5f65089ecc172c9017f2b40cf0df7e2411c0666)), closes [#39](https://github.com/Vinzent03/obsidian-advanced-uri/issues/39)

### [1.16.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.16.0...1.16.1) (2021-12-08)


### Bug Fixes

* prepand after frontmatter ([6fd80dc](https://github.com/Vinzent03/obsidian-advanced-uri/commit/6fd80dc84c2a2433777c4bade39aeb7feb8d9318)), closes [#36](https://github.com/Vinzent03/obsidian-advanced-uri/issues/36)

## [1.16.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.15.2...1.16.0) (2021-11-19)


### Features

* set cursor to specific line ([35b8455](https://github.com/Vinzent03/obsidian-advanced-uri/commit/35b84557e27a8a252454a95ca5115d951d6e34e9))


### Bug Fixes

* place cursor below heading and in block ([7bc7471](https://github.com/Vinzent03/obsidian-advanced-uri/commit/7bc7471dcb2a5ca370b1d0022108a1275ee98fd2))

### [1.15.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.15.1...1.15.2) (2021-11-17)


### Bug Fixes

* workspace documentation and add notice on workspace save ([a8d0c16](https://github.com/Vinzent03/obsidian-advanced-uri/commit/a8d0c165a6807497db968b31d48bb0e3d51333a8))

### [1.15.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.15.0...1.15.1) (2021-11-16)


### Bug Fixes

* update plugins works now ([eb833dd](https://github.com/Vinzent03/obsidian-advanced-uri/commit/eb833dd2b9871ce558e4d9b936068e5267c8ca04))

## [1.15.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.14.0...1.15.0) (2021-11-16)


### Features

* add x-success and x-error param ([5bda636](https://github.com/Vinzent03/obsidian-advanced-uri/commit/5bda63667326f2ad5eac884e84384aa27052b63a)), closes [#30](https://github.com/Vinzent03/obsidian-advanced-uri/issues/30)
* save current workspace ([717fcfe](https://github.com/Vinzent03/obsidian-advanced-uri/commit/717fcfe57e1ba996b8ef054a8383ce15f8b52d98)), closes [#33](https://github.com/Vinzent03/obsidian-advanced-uri/issues/33)
* update plugins, open theme/plugin browser ([a310d80](https://github.com/Vinzent03/obsidian-advanced-uri/commit/a310d80cdf91ad962c60d4fd820f2ae8936eeeba)), closes [#32](https://github.com/Vinzent03/obsidian-advanced-uri/issues/32)

## [1.14.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.13.0...1.14.0) (2021-11-01)


### Features

* add navigation to any settings tab ([702f30a](https://github.com/Vinzent03/obsidian-advanced-uri/commit/702f30a930967b16efec4d5b14561e372ff36cfa)), closes [#29](https://github.com/Vinzent03/obsidian-advanced-uri/issues/29)

## [1.13.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.12.0...1.13.0) (2021-10-21)


### Features

* support daily note for all actions ([8b78394](https://github.com/Vinzent03/obsidian-advanced-uri/commit/8b783940a0e8596dcfec8e5af199d92dfb1e517f))

## [1.12.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.11.2...1.12.0) (2021-10-09)


### Features

* support setting viewmode ([9ebc0d4](https://github.com/Vinzent03/obsidian-advanced-uri/commit/9ebc0d452812df7fbad416ad7d638464a69f772a)), closes [#27](https://github.com/Vinzent03/obsidian-advanced-uri/issues/27)

### [1.11.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.11.1...1.11.2) (2021-10-05)


### Bug Fixes

* focus existing pane instead of open new one ([a6020c7](https://github.com/Vinzent03/obsidian-advanced-uri/commit/a6020c7c826fb3764afaa5eb34431e781f0efa4d)), closes [#26](https://github.com/Vinzent03/obsidian-advanced-uri/issues/26)

### [1.11.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.11.0...1.11.1) (2021-09-06)

## [1.11.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.10.0...1.11.0) (2021-09-06)


### Features

* add support to check for file existence ([27ad1a1](https://github.com/Vinzent03/obsidian-advanced-uri/commit/27ad1a13b01d3a1f8557520d255c2081caddc64c)), closes [#20](https://github.com/Vinzent03/obsidian-advanced-uri/issues/20)

## [1.10.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.9.0...1.10.0) (2021-08-04)


### Features

* support heading and block for daily notes ([fe78a27](https://github.com/Vinzent03/obsidian-advanced-uri/commit/fe78a27510d8432bda6532b903e7f41e56a9df51)), closes [#19](https://github.com/Vinzent03/obsidian-advanced-uri/issues/19)

## [1.9.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.8.1...1.9.0) (2021-07-28)


### Features

* add file name support ([4816800](https://github.com/Vinzent03/obsidian-advanced-uri/commit/4816800282d0b9a5b59865ab8c295a8f0b67ee9b)), closes [#17](https://github.com/Vinzent03/obsidian-advanced-uri/issues/17)

### [1.8.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.8.0...1.8.1) (2021-07-23)


### Bug Fixes

* support replacing with empty text ([0468ac2](https://github.com/Vinzent03/obsidian-advanced-uri/commit/0468ac24b79b4787a84ca7768968ca5219a12073))

## [1.8.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.7.1...1.8.0) (2021-07-13)


### Features

* add support to navigate by UUID ([c1f509c](https://github.com/Vinzent03/obsidian-advanced-uri/commit/c1f509c2b2ed6d75d3688df4b0d2e98c9629c32e)), closes [#13](https://github.com/Vinzent03/obsidian-advanced-uri/issues/13)

### [1.7.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.7.0...1.7.1) (2021-05-15)


### Bug Fixes

* copying on mobile didn't work ([693e6a0](https://github.com/Vinzent03/obsidian-advanced-uri/commit/693e6a0e07746a7633cb3840f018d21cb63756a6)), closes [#12](https://github.com/Vinzent03/obsidian-advanced-uri/issues/12)

## [1.7.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.6.0...1.7.0) (2021-05-13)


### Features

* improve file picker for uri generation ([bfc6005](https://github.com/Vinzent03/obsidian-advanced-uri/commit/bfc6005a8d676d8785281ce9c7577f2798b47f18))
* support heading for append and prepend mode ([53936cb](https://github.com/Vinzent03/obsidian-advanced-uri/commit/53936cbe6613722f89088e4db30d2e1e012d5bda)), closes [#11](https://github.com/Vinzent03/obsidian-advanced-uri/issues/11)

## [1.6.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.5.0...1.6.0) (2021-05-02)


### Features

* add search and replace ([cd50799](https://github.com/Vinzent03/obsidian-advanced-uri/commit/cd507993530737dd12fc5cf0c2c4e3eae79fdeeb))

## [1.5.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.4.1...1.5.0) (2021-04-30)


### Features

* support open with modes ([46f734f](https://github.com/Vinzent03/obsidian-advanced-uri/commit/46f734f23568af7fa2bfe05b06dc73c76387ea1d)), closes [#9](https://github.com/Vinzent03/obsidian-advanced-uri/issues/9)

### [1.4.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.4.0...1.4.1) (2021-04-25)


### Bug Fixes

* prepend/append mode needed an existing file ([894760c](https://github.com/Vinzent03/obsidian-advanced-uri/commit/894760ca7bc79c9ed0b0aa89111bf36e12266283))

## [1.4.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.3.0...1.4.0) (2021-04-24)


### Features

* add mode support for command execution ([2bc4af1](https://github.com/Vinzent03/obsidian-advanced-uri/commit/2bc4af14d207e4eaa53800f2195c2917ffca9204)), closes [#8](https://github.com/Vinzent03/obsidian-advanced-uri/issues/8)

## [1.3.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.2.1...1.3.0) (2021-04-08)


### Features

* add better settings ([96f67cd](https://github.com/Vinzent03/obsidian-advanced-uri/commit/96f67cdcfbb51d66800db7c0e6ed853c56c6ed91)), closes [#6](https://github.com/Vinzent03/obsidian-advanced-uri/issues/6)
* add command URI builder ([0daf996](https://github.com/Vinzent03/obsidian-advanced-uri/commit/0daf9961fe8d4b953d9478f55445e721e13feeed))
* add daily notes URI builder ([cb0ebb6](https://github.com/Vinzent03/obsidian-advanced-uri/commit/cb0ebb68d2755a89265b7c26ec5c7781f77d0fa9)), closes [#7](https://github.com/Vinzent03/obsidian-advanced-uri/issues/7)
* encode and decode everything ([8a35341](https://github.com/Vinzent03/obsidian-advanced-uri/commit/8a35341d6ab3883d829e3dce8a4284d90859e909))

### [1.2.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.2.0...1.2.1) (2021-04-07)


### Bug Fixes

* data was changed although no data was not set ([8622476](https://github.com/Vinzent03/obsidian-advanced-uri/commit/8622476fb5698c0c1efd33b023f849e070694bc1))

## [1.2.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.1.0...1.2.0) (2021-04-07)


### Features

* encode file data properly ([70ef2ca](https://github.com/Vinzent03/obsidian-advanced-uri/commit/70ef2ca03934f61374530cd2510fdc2edfaf24cb))
* execute command in given file ([ae2d088](https://github.com/Vinzent03/obsidian-advanced-uri/commit/ae2d088b4ae2c2c0857d709a6f701d1f90460b0d)), closes [#5](https://github.com/Vinzent03/obsidian-advanced-uri/issues/5)


### Bug Fixes

* commands with checkCallback didn't work ([46d2478](https://github.com/Vinzent03/obsidian-advanced-uri/commit/46d24787f42ecf59e5da1aabb4d272e421d949a9))

## [1.1.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/1.0.0...1.1.0) (2021-04-06)


### Features

* add copy URI command ([f790d90](https://github.com/Vinzent03/obsidian-advanced-uri/commit/f790d904110129aad5cdf07d5c4d54fb459d0b7e))

## [1.0.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/0.2.2...1.0.0) (2021-04-06)


### Features

* execute commands ([0a5f47f](https://github.com/Vinzent03/obsidian-advanced-uri/commit/0a5f47f8b86cb74ac5a5adb9e908bfc80f2f5e1b))
* open daily note without writing ([3d52fc9](https://github.com/Vinzent03/obsidian-advanced-uri/commit/3d52fc911d24a3d83322667450a1f40f5e8601c8))

### [0.2.2](https://github.com/Vinzent03/obsidian-advanced-uri/compare/0.2.1...0.2.2) (2021-04-02)


### Features

* copy Advanced Obsidian URI ([43983ad](https://github.com/Vinzent03/obsidian-advanced-uri/commit/43983ade0e2e4204fd0939edeab2b6a6d19ca62e)), closes [#4](https://github.com/Vinzent03/obsidian-advanced-uri/issues/4)

### [0.2.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/0.2.0...0.2.1) (2021-04-02)


### Features

* add daily notes support ([c2333fe](https://github.com/Vinzent03/obsidian-advanced-uri/commit/c2333fe2ea930f4056b9365a68effc7fb6f08a9f)), closes [#2](https://github.com/Vinzent03/obsidian-advanced-uri/issues/2)

## [0.2.0](https://github.com/Vinzent03/obsidian-advanced-uri/compare/0.1.1...0.2.0) (2021-04-01)


### ⚠ BREAKING CHANGES

* rename override to overwrite

* rename override to overwrite ([4dfc301](https://github.com/Vinzent03/obsidian-advanced-uri/commit/4dfc3019e877e8cb6c5ea769325edca2fe42f162))

### [0.1.1](https://github.com/Vinzent03/obsidian-advanced-uri/compare/0.1.0...0.1.1) (2021-04-01)


### Features

* add prepend mode ([3040b8e](https://github.com/Vinzent03/obsidian-advanced-uri/commit/3040b8eaeb1afb3a178237df7e5b94eb7b9d9310)), closes [#1](https://github.com/Vinzent03/obsidian-advanced-uri/issues/1)
