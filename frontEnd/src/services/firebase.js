import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuXSF-qnFJ1aIrvSwSEjzXIFmr0TNeVzU",
  authDomain: "loginfb-9a454.firebaseapp.com",
  projectId: "loginfb-9a454",
  storageBucket: "loginfb-9a454.firebasestorage.app",
  messagingSenderId: "151124532057",
  appId: "1:151124532057:web:d1847e5f2fcd7813430a48",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
