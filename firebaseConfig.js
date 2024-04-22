import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCNBM7obg2PKsxT2Q4QrExRU9EF8h5q0Ks",
    authDomain: "welltalk-1bf26.firebaseapp.com",
    projectId: "welltalk-1bf26",
    storageBucket: "welltalk-1bf26.appspot.com",
    messagingSenderId: "827381621054",
    appId: "1:827381621054:web:30ed7aa969ef9d7edecc6f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)

export { imgDB, txtDB };

// // firebase.config.js
// import * as dotenv from 'dotenv';
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// dotenv.config();

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_APIKEY,
//     authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//     projectId: process.env.NEXT_PUBLIC_PROJECTID,
//     storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//     appId: process.env.NEXT_PUBLIC_APPID
// };

// // Initialize Firebase
// export const firebase = initializeApp(firebaseConfig);

// // Get a reference to the storage service
// export const storage = getStorage(firebase);