// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwphOaBJQcqx1kpQQkpI5a14kS86B81XA",
  authDomain: "hptuchaitanya.firebaseapp.com",
  projectId: "hptuchaitanya",
  storageBucket: "hptuchaitanya.firebasestorage.app",
  messagingSenderId: "858720919049",
  appId: "1:858720919049:web:8bdf69e87710b0211c22d8",
  measurementId: "G-HR6H59F1E6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// src/utils.js
export const generateUniqueId = () => {
  const randomNum = Math.floor(Math.random() * 100000); // 0-99999
  const padded = String(randomNum).padStart(5, "0"); // ensures 5 digits
  return `HPTU${padded}`;
};
