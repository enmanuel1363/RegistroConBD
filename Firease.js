// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxfpNvDJOIlWPGd1qO-uWDKvrHEZZP9j8",
  authDomain: "appgestionclientes-ffe01.firebaseapp.com",
  projectId: "appgestionclientes-ffe01",
  storageBucket: "appgestionclientes-ffe01.firebasestorage.app",
  messagingSenderId: "41787282258",
  appId: "1:41787282258:web:d90a824b3de778344ba08b"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;