// NOTE
// Please use your own firebase details below.

import firebase from 'firebase/app';

// Initialize Firebase
const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'AUTH_DOMAIN',
  databaseURL: 'DB_URL',
  projectId: 'PROJECT_ID',
  storageBucket: 'BUCKET',
  messagingSenderId: 'SENDER_ID'
};

firebase.initializeApp(config);
