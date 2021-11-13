# ngx-slice-kit changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] v1.0.0

## 14Nov 2021

### Added

### Changed

### Fixed

### Removed


## Released [v0.12.0]

## 13Nov 2021

### Changed
- SCSS `/` operator was replaced by `math.div`


## 12 Nov 2021

### Breaking
- `sdk-theme` attribute now is `sdkTheme`

### Changed
- Updated radio, input, select offset styles.
- Few tests changed.


## 4 Nov 2021

### Changed
- Updated Angular to v13


## Released [v0.11.0]

## 13 Aug 2021

### Changed
- Updated dependencies


## 30 Aug 2021

### Added
- prepared nav-menu demo example


## 29 Aug 2021

### Added
- prepared nav-menu demo example


## Released [v0.10.0]

## 17 May 2021

### Added
`TabGroupComponent` as parent for `tabs` and `nav-tabs`
Images for `nav-tabs` demo

### Fixed
`sdk-tab-group` ExpressionChangedAfterItHasBeenCheckedError

### Removed
Duplicate code from `nav-tabs` and `tabs`

## Released [v0.9.7]

## 11 May 2021

### Fixed
`sdk-tab-group` now works with dynamically added/changed list elements


## 15 Apr 2021

### Added
web:
- popup service api documentation
- `Carousel` demo

### Changed
- api table updated to handle methods description and their arguments

### Fixed
- alerts and dialog services demos

### Removed


## Released [v0.9.6]

## 15 Apr 2021

### Added
web:
- `Dropdown` directive demo
- theming guide updated, prepared global theme updating method

ngx-slice-kit:
- `Dropdown directive` can't be "multi" anymore

### Fixed
ngx-slice-kit:
- `ThemeService` theme update method


## 14 Apr 2021

### Added
web:
- `Autocomplete` demo
- `Select` demo

ngx-slice-kit:
- `Autocomplete` can't be "multi" anymore
- remove tests with `multi` prop from `autocomplete` tests

### Changed
ngx-slice-kit:
- `.sdk-caption` color: --base-a40


## Released [v0.9.5]

## 13 Apr 2021

### Added
web:
- enhanced theme palette guide
- guide theme palette updater
- sanitized url for Sidenav and DemoExample components
- `input` demos

ngx-slice-kit:
- HexToRgba theme method
- `ThemeService` public interfaces expanded and updated

### Changed
ngx-slice-kit:
- theme model color handling updated


## Unreleased v0.9.4

## 13 Apr 2021

### Added
slice-kit:
- access modifiers for `AlertService` methods
- `AlertOptions` action property is false by default

web:
- alert demos


## 12 Apr 2021

### Added
web:
- pagination component demo
- progress component demo
- slider component demo
- sidenav component demo
- demo component stackblitz url

### Changed
web:
- updated theming guide
- resources updated


## Released [v0.9.3]

## 12 Apr 2021

### Changed
slice-kit:
-`Tabs` tab left/right padding is 16px
-`Tabs` content padding is 0px

### Fixed
slice-kit:
- Error color for `textarea` error caption


## Unreleased [v0.9.2]

## 12 Apr 2021

### Added
web:
- examples for tooltip and popup (refers to #32)
- demos for divider, checkbox, dialog, icons and segmented buttons, refers to [#32](https://github.com/rovergulf/ngx-slice-kit/issues/32) and [#148](https://github.com/rovergulf/ngx-slice-kit/issues/148)

### Changed
web:
- toggle component demo enhanced
- color guide moved to theming
- update guide styling
- `ApiDefinitionsGroup` model added

### Fixed
web:
- some source code namings

slice-kit:
- input error caption and icon colors
- tooltip directive shadow color


## Unreleased v0.9.1

## 9 Apr 2021

### Added
web:
- buttons demo

### Changed
slice-kit:
- theme dark background & regular-text colors
- button shadows with dark theme is black now
- `base-button` and `stroked-button` has background by hover


## 8 Apr 2021

### Added
slice-kit:
- several tests for `radio`/`checkbox`/`input`/`textarea`/`progress`/`toggle`/`slider`/`popup`

web:
- `lib-code-snippet` component for code highlighted examples

### Fixed
- adaptive view for demos, closes #169


## Released [v0.9.0]

## 8 Apr 2021

### Added
web:
- updated demo component
- demo component copy snippet method
- textarea demo


slice-kit:
- `Icon-button` completely round button

### Changed
slice-kit:
- `Round-button` is now not completely round, but has rounded edges
- peer dependencies up to 11.2

### Fixed
slice-kit:
- `Raised-button` now has shadows
- `sdk-tabs-group` change detection
- `sdk-tab` can work with *ngFor now
- `sdk-divider` color


## Unreleased v0.8.1

## 6 Apr 2021

### Added
web:
- `ApiDefinition` and `DemoExample` models

### Changed

### Fixed
engine-kit:
- `sdk-button` legacy references

### Removed
web:
- unnecessary test components


## 5 Apr 2021

### Added
web:
- [murhafsousli/ngx-highlightjs](https://github.com/murhafsousli/ngx-highlightjs) package usage to code highlighting, [highlight.js](https://github.com/highlightjs/highlight.js) included

### Fixed
engine-kit:
- sdk-buttons unexpected animation


## Released [v0.8.0]

## 5 Apr 2021

### Added
engine-kit:
- text color variables for theme palettes with suffix `-text`
- GitHub workflows for npm package and gcr image

web:
- [ngx-cookie](https://github.com/salemdar/ngx-cookie) package installed, as well `"ngx-cookie-backend"` for SSR supporting

### Changed
- ❕IMPORTANT: Angular version updated up to 11.2.8
- ❗BREAKING: `sdk-button` tag was changed to `sdk-base-button` to make color handling more easy

### Fixed
- buttons color usage
- segmented buttons background color

### Removed
- `ngx-cookie-universal` package usage


## 3 Apr 2021

### Fixed
- colors for `dots`/`carousel`/`dropdowns`/`select`/`autocomplete`/`tab-group`/`alert`/`tooltip`/`slider`/`progress`
- dropdown declaration error


## 2 Apr 2021

### Fixed
- `icons` in `sidenav`
- hover/active colors in `sidenav`
- colors for `input`/`textarea`/`toggle`/`tabs`/`nav-tabs`/`radio`/`checkbox` components


## 30 Mar 2021

### Added
- `carousel.component` tests


## 29 Mar 2021

### Added
- `carousel.component` tests

### Changed
- Change `setInterval` in `carousel.component` to `RxJs streams`


## 28 Mar 2021

### Added
- `theme.directive` tests


## 27 Mar 2021

### Added
- `theme.service` tests

## 25 Mar 2021

### Added
- `layout-service` test
- `Loading.(directive/service/component)` tests

## 21 Mar 2021

### Added
- `slider.component` tests

### Changed
- theme color palette regenerated and does not uses alpha color anymore

### Fixed

### Removed

## 17 Mar 2021

### Added
ngx-slice-kit:
- implemented new color palette for #80 issue
- background and color default body variables
- few more components tests

### Changed
ngx-slice-kit:
- now `placeholder` for `input`/`textarea`/`select`/`autocomplete` components is empty by default
- `textarea` component has `resizable` input property now, to forbid resize possibility

### Fixed
ngx-slice-kit:
- public api imports to prevent errors like:
  `Unsupported private class LoadingModule. This class is visible to consumers via SliceKitModule -> LayoutModule -> LoadingModule, but is not exported from the top-level library entrypoint.`

### Removed


## 16 Mar 2021

### Added
ngx-slice-kit:
- Now you can add attr `required` without value (like false/true) to set it as true for `autocomplete`/`select`/`input`/`textarea` components.

### Changed
ngx-slice-kit:
- Formatted core module
- `progress.component` tests.
- closed #34
- closed #31

### Fixed
ngx-slice-kit:
- removed tooltip component unexpected debug log
- `Checkbox` and `Radio` components do not have margin anymore if they do not contain text.

web:
- closed #73

### Removed


## 15 Mar 2021

### Added
- `layout-control.service` add some tests
- `dots.component` tests
- `pagination.component` tests

### Fixed
- `dots.component` fix dots generation moment and click handler


## 14 Mar 2021

### Added
- `tooltip.directive` tests


## 11 Mar 2021

### Added
- `dialog.service` tests
- `dialog.component` tests
- `navigation-scroll.directive` tests


## 10 Mar 2021

### Added
- `popup.service` tests
- `popup.component` tests


## 9 Mar 2021

### Added
- `alert.component` tests
- `alerts.component` tests
- `alert.service` tests


## 05 Mar 2021

### Added
- `tab` component tests
- `tabs` component tests


## 04 Mar 2021

### Added
- `nav-tabs` component tests

### Fixed
Fix scroll issue in `tabs` component


## Released [v0.7.0]

## 02 Mar 2021

### Changed
- Update Angular version up to 11.2.3 (issue #47)


## Released [v0.6.5]

## 01 Mar 2021

### Changed
- nav-tabs: replace `div` tags to `a` tags
- nav-tabs: replace navigation by `click handler` to `routerLink`

### Fixed
- nav-tabs: fixed bug when navigation to route with tab from tab outlet was incorrect


## Released [v0.6.5]

## 16 Feb 2021

### Added
- test #1

## 29 Jan 2021

### Added
- popup message line breaking closes #1


## Released [v0.6.4]

## 29 Jan 2021

### Changed
- updated Angular `core` and `cli` versions up to latest 11.1+ closes #3


[Unreleased]: https://github.com/rovergulf/ngx-slice-kit/v0.12.0...main
[v1.0.0]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.12.0...v1.0.0
[v0.12.0]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.11.0...v0.12.0
[v0.11.0]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.10.0...v0.11.0
[v0.10.0]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.9.7...v0.10.0
[v0.9.7]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.9.6...v0.9.7
[v0.9.6]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.9.5..v0.9.6
[v0.9.5]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.9.3..v0.9.5
[v0.9.3]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.9.0..v0.9.3
[v0.9.0]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.8.0...v0.9.0
[v0.8.0]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.7.0...v0.8.0
[v0.7.0]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.6.5...v0.7.0
[v0.6.5]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.6.4...v0.6.5
[v0.6.4]: https://github.com/rovergulf/ngx-slice-kit/tree/v0.6.4
