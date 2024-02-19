// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQQDMMqOy6sxFHlIawVK7Jpn-IDqXCbKc",
  authDomain: "day-to-dusk-cb185.firebaseapp.com",
  projectId: "day-to-dusk-cb185",
  storageBucket: "day-to-dusk-cb185.appspot.com",
  messagingSenderId: "500323751927",
  appId: "1:500323751927:web:aa65c409c5e2a6abc380f2",
  measurementId: "G-2NWWGY2313"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app