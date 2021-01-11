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
curl -X POST --data-urlencode "payload={\"channel\": \"#frontend\", \"username\": \"ngx-slice-kit\", \"text\": \"Successfully deployed ngx-slice-kit by $(hostname)\"}" https://hooks.slack.com/services/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
echo "[$(date +%T)] deploying ngx-slice-kit completed"


