#!/usr/bin/env bash

cat angular.json > /dev/null 2>&1 || (echo "Must be run from repository root" && exit 1)

RUN_START=$(date)
VERSION=$(cat libs/ngx-slice-kit/package.json | grep version | awk '{print $2}' | tr -d \"\,)

set -e

source ./scripts/util.sh

rm -rf dist/ngx-slice-kit 2>&1

log_info "[$(date)] start building ngx-slice-kit"
ng build ngx-slice-kit --prod || exit 3
mkdir -p dist/ngx-slice-kit/lib/core/styles
mkdir -p dist/ngx-slice-kit/schematics
cp -a libs/ngx-slice-kit/src/lib/core/styles/. dist/ngx-slice-kit/lib/core/styles || exit 4
log_success "[$(date)] ng build finished"

npm run build --prefix libs/ngx-slice-kit || exit 1
log_success "[$(date)] npm build finished"

log_info "[$(date)] publish ${REGISTRY_IMAGE} registry image"
cd dist/ngx-slice-kit && npm publish --access public && cd ../.. || exit 5
log_success "[$(date)] ${PACKAGE_NAME}@${VERSION} successfully published!"

log_info "Remove bundled dist"
rm -rf dist/ngx-slice-kit || exit 7

log_success "[$(date)] Finish. Run started at [${RUN_START}]"
