import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB_u_YPhx8Oos0BQcpShjIFPGIeAj2jInU",
    authDomain: "taoyuancramschool.firebaseapp.com",
    databaseURL: "https://taoyuancramschool-default-rtdb.firebaseio.com",
    projectId: "taoyuancramschool",
    storageBucket: "taoyuancramschool.appspot.com",
    messagingSenderId: "1091874301",
    appId: "1:1091874301:web:c3d5c44834509f9d3dbd94",
    measurementId: "G-T7D72YM57D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const getstorage = getStorage(app);


