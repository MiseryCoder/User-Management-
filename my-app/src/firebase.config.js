// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyALOqCyOUd6jF8dvdsMKgBnTry98MPaLAQ",
	authDomain: "otp-prj-4dff0.firebaseapp.com",
	projectId: "otp-prj-4dff0",
	storageBucket: "otp-prj-4dff0.appspot.com",
	messagingSenderId: "786278213063",
	appId: "1:786278213063:web:08705cbfe74bb50c8de5e2",
	measurementId: "G-YD4QDVFX9J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
