import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDn3P6peMCX5igQ4KvO2MA-x64GmA5YkCE',
    authDomain: 'tippie-ee963.firebaseapp.com',
    projectId: 'tippie-ee963',
    storageBucket: 'tippie-ee963.firebasestorage.app',
    messagingSenderId: '243546385965',
    appId: '1:243546385965:web:bb407985d73e5d1491d2a4',
    measurementId: 'G-ZDP3TKPLN9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
