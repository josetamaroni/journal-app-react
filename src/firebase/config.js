// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKHQDyU8jAh1QN5OTMTPAiR8BeH6lEmdg",
  authDomain: "curso-react-5c175.firebaseapp.com",
  projectId: "curso-react-5c175",
  storageBucket: "curso-react-5c175.appspot.com",
  messagingSenderId: "457450496967",
  appId: "1:457450496967:web:adf0605e2fc170afb36fe2"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
