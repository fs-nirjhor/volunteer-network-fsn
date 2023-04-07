import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA92TuP2l6L2MuAg0FQZphBX71LrtLln40",
  authDomain: "volunteer-network-fsn.firebaseapp.com",
  projectId: "volunteer-network-fsn",
  storageBucket: "volunteer-network-fsn.appspot.com",
  messagingSenderId: "913066079892",
  appId: "1:913066079892:web:e7187a465aa9dcf1df2681",
  measurementId: "G-LC5QDQCBB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
