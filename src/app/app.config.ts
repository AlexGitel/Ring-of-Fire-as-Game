import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp(
      {"projectId":"ring-of-fire-4fe07",
        "appId":"1:532902929834:web:b00e369c1e9c68c446f7d3",
        "storageBucket":"ring-of-fire-4fe07.firebasestorage.app",
        "apiKey":"AIzaSyBbLiVvexC0WKQq6X5-G39F8_uQ0vV5Tts",
        "authDomain":"ring-of-fire-4fe07.firebaseapp.com",
        "messagingSenderId":"532902929834"
      })), 
    provideFirestore(() => getFirestore()), provideAnimationsAsync()]
};
