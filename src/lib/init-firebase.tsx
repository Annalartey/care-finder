import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBIIqB2LHb0I9AynqYuLf8kz6EvxZd6DPk",
  authDomain: "care-finder-b20bf.firebaseapp.com",
  databaseURL: "https://care-finder-b20bf-default-rtdb.firebaseio.com",
  projectId: "care-finder-b20bf",
  storageBucket: "care-finder-b20bf.appspot.com",
  messagingSenderId: "879261892649",
  appId: "1:879261892649:web:16754673082eaf343b5c38",
  measurementId: "G-J3F7KM3J44"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);