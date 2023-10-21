// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrlUFWtxWFyu67Pv5s4WToyQzf1F-5rcQ",
  authDomain: "aesthetica-auth.firebaseapp.com",
  projectId: "aesthetica-auth",
  storageBucket: "aesthetica-auth.appspot.com",
  messagingSenderId: "825560535261",
  appId: "1:825560535261:web:91d146d5e7d27d289b4b34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;