// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4vKZYBJtfEtXVdVLoFEzFyS5MtSvYU1w",
  authDomain: "happytrip-87b8f.firebaseapp.com",
  projectId: "happytrip-87b8f",
  storageBucket: "happytrip-87b8f.appspot.com",
  messagingSenderId: "941274499067",
  appId: "1:941274499067:web:288a10270745bd5f03ed5e",
  measurementId: "G-FZBJ0XBEED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
