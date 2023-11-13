// Import the functions you need from the SDKs you need
import "firebase/database"
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIcuNzJzkLK_WaLDDPmke15RJzNuw43wY",
  authDomain: "celebrecognize.firebaseapp.com",
  databaseURL: "https://celebrecognize-default-rtdb.firebaseio.com",
  projectId: "celebrecognize",
  storageBucket: "celebrecognize.appspot.com",
  messagingSenderId: "984565137264",
  appId: "1:984565137264:web:88a3d49e81e67ef7f699b5",
  measurementId: "G-L8NF9LWVT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export database
export default db;