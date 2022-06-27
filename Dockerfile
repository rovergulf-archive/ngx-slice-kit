FROM node:latest as build

RUN apt-get install -y git
RUN npm install -g @angular/cli

WORKDIR /app
ADD . /app
RUN npm install
RUN npm run build:kit
RUN npm run build:ssr

FROM node:alpine

WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app
# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "run", "serve:ssr"]
