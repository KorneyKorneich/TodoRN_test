// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
    apiKey: "AIzaSyCpqySmMoupK6Lg0Ni1kQmLvX-liLcpel8",
    authDomain: "todorn-test.firebaseapp.com",
    projectId: "todorn-test",
    storageBucket: "todorn-test.firebasestorage.app",
    messagingSenderId: "967490054602",
    appId: "1:967490054602:web:238370e4b373ff7ed20733"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
const FIREBASE_AUTH = getAuth(app);

export {
    app,
    db,
    storage,
    ref,
    getFirestore,
    collection,
    addDoc,
    // auth,
    FIREBASE_AUTH,
};
