// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpqjQzp2N1zx4D2Ye0QTEKpIVFKzUr0Xg",
  authDomain: "mjrentify.firebaseapp.com",
  projectId: "mjrentify",
  storageBucket: "mjrentify.appspot.com",
  messagingSenderId: "357455046521",
  appId: "1:357455046521:web:74af51cc65c2d8a7dc71a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth,storage };