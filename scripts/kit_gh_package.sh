#!/usr/bin/env bash

PACKAGE_NAME="ngx-engine-kit"
RUN_START=$(date)

set -e

cat angular.json > /dev/null 2>&1 || (echo "Must be run from repository root" && exit 1)

source ./scripts/util.sh

log_info "[$(date)] start building ngx-engine-kit"
cat ./libs/ngx-engine-kit/src/lib/environments/environment.dev.ts > ./libs/ngx-engine-kit/src/lib/environments/environment.ts || exit 2
ng build ngx-engine-kit --prod || exit 3
cat ./libs/ngx-engine-kit/src/lib/environments/environment.local.ts > ./libs/ngx-engine-kit/src/lib/environments/environment.ts || exit 4
log_success "[$(date)] ngx-engine-kit dist has built"

log_info "[$(date)] publish ${REGISTRY_IMAGE} registry image"
cd dist/ngx-engine-kit && npm publish && cd ../.. || exit 5
VERSION=$(cat libs/ngx-engine-kit/src/public-api.ts | grep Version | awk '{print $5}' | tr -d \;\`) || exit 6
log_success "[$(date)] ${PACKAGE_NAME}@${VERSION} successfully published!"

log_info "Remove bundled dist"
rm -rf dist/ngx-engine-kit || exit 7

log_success "[$(date)] Finish. Run started at [${RUN_START}]"
