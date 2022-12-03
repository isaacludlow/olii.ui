// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  useEmulators: false, // Set to false to connect to the production firebase environment. Set to true to connect local emulators.
  production: false,
  mapsKey: 'AIzaSyBLAdsFxNLhjWztJ3dY6uruj856r6We_yo',
  firebase: {
    apiKey: "AIzaSyCpPv2UX3NOQFB8Y8NwfM7dvVi4Nn-nzQc",
    authDomain: "oliiapp.firebaseapp.com",
    projectId: "oliiapp", // Add the "demo-" prefix when running local emulators. Remove it when connecting to prod.
    storageBucket: "oliiapp.appspot.com",
    messagingSenderId: "1010655614462",
    appId: "1:1010655614462:web:b57f8845a4a707cac69caf",
    measurementId: "G-R6KP5B8T29"
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
