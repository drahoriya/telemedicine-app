import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADpUfX3qxxIQ8BDlbIxH7qI6EbgnT6mW8",
  authDomain: "medi-consult-b6113.firebaseapp.com",
  projectId: "medi-consult-b6113",
  storageBucket: "medi-consult-b6113.firebasestorage.app",
  messagingSenderId: "92215388544",
  appId: "1:92215388544:web:016c9cb65f4aa231473965",
  measurementId: "G-N659XLE4ZX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
