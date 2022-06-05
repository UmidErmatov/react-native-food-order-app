// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1sudlnQ7Ik2_dc_O8tAInIjdLW-UxEpg",
    authDomain: "food-delivery-8838c.firebaseapp.com",
    projectId: "food-delivery-8838c",
    storageBucket: "food-delivery-8838c.appspot.com",
    messagingSenderId: "249298500470",
    appId: "1:249298500470:web:281ff613038947f23e9857",
    measurementId: "G-GP0ZS6LTWD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);