// // Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore"

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBnMmAnAw0o2SZ9AyakgE450XblGfadi0U",
//   authDomain: "koll-app.firebaseapp.com",
//   projectId: "koll-app",
//   storageBucket: "koll-app.appspot.com",
//   messagingSenderId: "485979616959",
//   appId: "1:485979616959:web:f451668063dd1cb896780a",
//   measurementId: "G-L8D2C3B549"
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0){
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app()
// }

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnMmAnAw0o2SZ9AyakgE450XblGfadi0U",
  authDomain: "koll-app.firebaseapp.com",
  projectId: "koll-app",
  storageBucket: "koll-app.appspot.com",
  messagingSenderId: "485979616959",
  appId: "1:485979616959:web:f451668063dd1cb896780a",
  measurementId: "G-L8D2C3B549"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = firebase.auth()
export const db = getFirestore(app);

export { auth };