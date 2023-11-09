// Import the functions you need from the SDKs you need
import "firebase/database"
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvc_ZE0gYLkI-86wuReEuBGbG0kCB837M",
  authDomain: "vue-screenshot.firebaseapp.com",
  projectId: "vue-screenshot",
  storageBucket: "vue-screenshot.appspot.com",
  messagingSenderId: "480718889271",
  appId: "1:480718889271:web:891b08d230f8395e31bab2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export database
export default db;