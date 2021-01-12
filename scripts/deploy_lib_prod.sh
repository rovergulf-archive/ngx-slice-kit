#!/usr/bin/env bash

echo "[$(date +%T)] start deploying ngx-slice-kit"
rm -rf dist/ngx-slice-kit || echo "current dist does not exists"
ng build ngx-slice-kit --prod || exit 1
echo "[$(date +%T)] 'ngx-slice-kit' has built. copying styles..."
mkdir -p dist/ngx-slice-kit/lib/core/styles
mkdir -p dist/ngx-slice-kit/schematics
cp -a libs/ngx-slice-kit/src/lib/core/styles/. dist/ngx-slice-kit/lib/core/styles || exit 1
npm run build --prefix libs/ngx-slice-kit || exit 1
cd dist/ngx-slice-kit || exit 1
npm publish --access public
echo "[$(date +%T)] deploying ngx-slice-kit completed"


