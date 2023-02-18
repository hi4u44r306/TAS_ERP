// import firebase from 'firebase';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

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

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
