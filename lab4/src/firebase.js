import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzE1HDOjsEG2Pso4F_QnvUJQ4I8fBXRX8",
  authDomain: "fir-for-laboratory-work-4.firebaseapp.com",
  projectId: "fir-for-laboratory-work-4",
  storageBucket: "fir-for-laboratory-work-4.firebasestorage.app",
  messagingSenderId: "827698680284",
  appId: "1:827698680284:web:2f668075113c5ce0de3f19",
  measurementId: "G-5MVSLDMJYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };