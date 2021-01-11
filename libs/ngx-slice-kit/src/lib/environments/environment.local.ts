// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const servicesList = [
    'auth', 'emailia', 'engine', 'inkbe'
]

export const environment = {
    production: false,
    domain: 'localhost',
    apiUrl: 'http://api-dev.rovergulf.net',
    apiUrls: {
        auth: `http://localhost:9096`,
        emailia: `http://localhost:9096`
    },
    mediaUrl: 'https://api-dev.rovergulf.net/media/',
    imagesUrl: 'https://rovergulf.fra1.digitaloceanspaces.com/images/',
    spacesUrl: `https://rovergulf.fra1.digitaloceanspaces.com/`,
    cdnUrl: `https://rovergulf.fra1.cdn.digitaloceanspaces.com`,
    google: {
        "clientId": "478194333386-hg08u5scpd24df0c4im11jq1mgcq6icq.apps.googleusercontent.com"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
