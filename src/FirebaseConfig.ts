import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA-SVMW-vXKZWgEfI0VplsLmf4eOtgZI2c",
    authDomain: "pfc-fernando.firebaseapp.com",
    projectId: "pfc-fernando",
    storageBucket: "pfc-fernando.appspot.com",
    messagingSenderId: "738359949501",
    appId: "1:738359949501:web:8f8f72bc0f06a058001fd4"
  };
  
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = firebaseAuth.initializeAuth(app);
export const firestore = db;

