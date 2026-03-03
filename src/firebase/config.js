import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'vergr-44494',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if Firebase is configured (has a real API key)
export const isFirebaseConfigured = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'demo-key';

const app = initializeApp(firebaseConfig);

// IMPORTANT: Your Firestore uses custom database ID 'vgrdb', not '(default)'
export const db = isFirebaseConfigured
  ? initializeFirestore(app, {}, 'vgrdb')
  : null;

export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = isFirebaseConfigured ? getFunctions(app, 'europe-west1') : null;

// Auth providers
export const googleProvider = new GoogleAuthProvider();

export default app;
