import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Safely attempt eager glob import with wildcard pattern so builds on external platforms (like Hostinger/GitHub/Cloud Run)
// succeed smoothly even when firebase-applet-config.json is missing or ignored by .gitignore
const configModules = import.meta.glob('../../*firebase-applet-config.json', { eager: true });
let appletConfig: Record<string, string> = {};
for (const path in configModules) {
  if (path.endsWith('firebase-applet-config.json')) {
    appletConfig = (configModules[path] as { default?: Record<string, string> })?.default || {};
    break;
  }
}

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId || "universal-antler-4lg2z",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || appletConfig.appId || "1:817838558208:web:dca1882cb14c6aa0569ce5",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || appletConfig.apiKey || "AIzaSyBCxiYUQjQ3tGGWeFWnaD-q_PQq3W2E7So",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain || "universal-antler-4lg2z.firebaseapp.com",
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || appletConfig.firestoreDatabaseId || "ai-studio-socavalleyapartm-6d3b2e75-2dc1-4af7-996d-716e1c937751",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket || "universal-antler-4lg2z.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId || "817838558208",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || appletConfig.measurementId || "",
  oAuthClientId: import.meta.env.VITE_FIREBASE_OAUTH_CLIENT_ID || appletConfig.oAuthClientId || "817838558208-ofkbik52a7cdb8pkddip1ab358aomqgr.apps.googleusercontent.com",
  recaptchaSiteKey: import.meta.env.VITE_FIREBASE_RECAPTCHA_SITE_KEY || appletConfig.recaptchaSiteKey || ""
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);

