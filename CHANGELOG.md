# ngx-slice-kit changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] v0.8.0

## 21 Mar 2021

### Added

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


[Unreleased]: https://github.com/rovergulf/ngx-slice-kit/v0.7.0...main
[v0.7.0]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.6.5...v0.7.0
[v0.6.5]: https://github.com/rovergulf/ngx-slice-kit/compare/v0.6.4...v0.6.5
[v0.6.4]: https://github.com/rovergulf/ngx-slice-kit/tree/v0.6.4
