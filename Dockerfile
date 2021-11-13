FROM node:latest as build

RUN apt-get install -y git
RUN npm install -g @angular/cli

WORKDIR /app
ADD . /app
RUN npm install
RUN ng build ngx-slice-kit --configuration production
RUN npm run build:ssr --configuration production

FROM node:alpine

WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app
# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "run", "serve:ssr"]
