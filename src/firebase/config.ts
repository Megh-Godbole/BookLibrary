import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbef1DKzmDT8hfsjmAV02roJMw3UBZWv0",
  authDomain: "booklibraryapp-4facb.firebaseapp.com",
  projectId: "booklibraryapp-4facb",
  storageBucket: "booklibraryapp-4facb.firebasestorage.app",
  messagingSenderId: "946460591330",
  appId: "1:946460591330:web:19daae55372869bc9ecabb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };