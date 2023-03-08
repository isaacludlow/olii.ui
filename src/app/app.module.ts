import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule, USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/compat/database';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule, BUCKET, USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { AngularFireAuthModule, USE_DEVICE_LANGUAGE, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFireMessagingModule, SERVICE_WORKER, VAPID_KEY } from '@angular/fire/compat/messaging';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { AngularFireRemoteConfigModule, SETTINGS as REMOTE_CONFIG_SETTINGS, DEFAULTS as REMOTE_CONFIG_DEFAULTS } from '@angular/fire/compat/remote-config';
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/compat/performance';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import {
  AngularFireAnalyticsModule,
  APP_NAME,
  APP_VERSION,
  DEBUG_MODE as ANALYTICS_DEBUG_MODE,
  ScreenTrackingService,
  UserTrackingService,
  COLLECTION_ENABLED
} from '@angular/fire/compat/analytics';

// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideAuth, connectAuthEmulator, getAuth } from '@angular/fire/auth';
// import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
// import { connectFirestoreEmulator, getFirestore, provideFirestore, enableMultiTabIndexedDbPersistence } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedComponentsModule } from './components/shared-components.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedComponentsModule,
    IonicModule.forRoot({rippleEffect: false}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule/*.enablePersistence({ synchronizeTabs: true })*/,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireRemoteConfigModule,
    AngularFireMessagingModule,
    AngularFireAnalyticsModule,
    AngularFireFunctionsModule,
    AngularFirePerformanceModule,

    // provideAuth(() => {
    //   const auth = getAuth();
    //   if (environment.useEmulators) {
    //     connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    //   }
    //   return auth;
    // }),
    // provideFirestore(() => {
    //   const firestore = getFirestore();
    //   if (environment.useEmulators) {
    //       connectFirestoreEmulator(firestore, 'localhost', 8080);
    //   }
    //   enableMultiTabIndexedDbPersistence(firestore)
    //   // .then(
    //   //   () => resolvePersistenceEnabled(true),
    //   //   () => resolvePersistenceEnabled(false)  
    //   // );
    //   return firestore;
    // }),
    // provideFirebaseApp(_ => initializeApp(environment.firebase)),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserTrackingService,
    ScreenTrackingService,
    PerformanceMonitoringService,
    { provide: BUCKET, useValue: environment.firebase.storageBucket },
    { provide: FIRESTORE_SETTINGS, useValue: { ignoreUndefinedProperties: true } },
    { provide: ANALYTICS_DEBUG_MODE, useValue: true },
    { provide: COLLECTION_ENABLED, useValue: true },
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined },
    { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9000] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined },
    { provide: USE_STORAGE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9199] : undefined },
    { provide: REMOTE_CONFIG_SETTINGS, useFactory: () => isDevMode() ? { minimumFetchIntervalMillis: 10_000 } : {} },
    { provide: REMOTE_CONFIG_DEFAULTS, useValue: { background_color: 'red' } },
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    { provide: SERVICE_WORKER, useFactory: () => typeof navigator !== 'undefined' && navigator.serviceWorker?.register('firebase-messaging-sw.js', { scope: '__' }) || undefined },
    { provide: APP_VERSION, useValue: '0.1.0' },
    { provide: APP_NAME, useValue: 'Angular' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
