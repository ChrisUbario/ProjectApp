// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAACPBScqGPPoMjLH3gY62rpBJpBIweqow",
    authDomain: "safelab-6d697.firebaseapp.com",
    databaseURL: "https://safelab-6d697-default-rtdb.firebaseio.com",
    projectId: "safelab-6d697",
    storageBucket: "safelab-6d697.firebasestorage.app",
    messagingSenderId: "439227524895",
    appId: "1:439227524895:web:87f7fb04013e734050b22a"
};

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };