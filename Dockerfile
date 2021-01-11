FROM registry.digitalocean.com/rovergulf/env/angular-builder as build

RUN apk add --no-cache git
RUN npm install -g @angular/cli

WORKDIR /app
ADD . /app
RUN npm install
#RUN ng build ngx-slice-kit --prod
#RUN ng build ngx-cookie-universal --prod
#RUN cat /app/libs/ngx-core-kit/src/lib/environments/environment.prod.ts > /app/libs/ngx-core-kit/src/lib/environments/environment.ts
#RUN ng build ngx-core-kit --prod
RUN npm run slice-kit:build:ssr --prod
# RUN npm run generate:prerender
#RUN npm run test:ssr

FROM node:alpine

WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app
# Expose the port the app runs in
EXPOSE 4201

# Serve the app
CMD ["npm", "run", "slice-kit:serve:ssr"]
