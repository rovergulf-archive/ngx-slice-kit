#!/usr/bin/env bash

cat angular.json > /dev/null 2>&1 || (echo "Must be run from repository root" && exit 1)

RUN_START=$(date)

set -e

source ./scripts/util.sh

VERSION=$(cat package.json | grep version | awk '{print $2}' | tr -d \"\,)
REGISTRY_IMAGE=eu.gcr.io/rovergulf/slice-kit

log_info "[$(date +%T)] start deploying ${REGISTRY_IMAGE} image"
docker build --no-cache -t $REGISTRY_IMAGE:$VERSION -t $REGISTRY_IMAGE:latest . --file=Dockerfile || exit 2
log_info "[$(date +%T)] Image ${REGISTRY_IMAGE} has built. deploying:"
docker push $REGISTRY_IMAGE:$VERSION || exit 3
docker push $REGISTRY_IMAGE:latest || exit 4
log_success "[$(date +%T)] deploying registry image completed. Run started at [${RUN_START}]"
