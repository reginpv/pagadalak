// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUWbLCeDuhGarTKTibF8MUxLNP_PPKpaw",
  authDomain: "pagadalak-bda48.firebaseapp.com",
  projectId: "pagadalak-bda48",
  storageBucket: "pagadalak-bda48.appspot.com",
  messagingSenderId: "1079523566431",
  appId: "1:1079523566431:web:434449d0aeccf917ceccea"
}

if(!getApps().length) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
}

export default getFirestore()