import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCm5S6rXcFJTnL5ZD6Bkw6DKtNvHNe5jWg",
  authDomain: "dwm-dannywebmakers.firebaseapp.com",
  projectId: "dwm-dannywebmakers",
  storageBucket: "dwm-dannywebmakers.firebasestorage.app",
  messagingSenderId: "8596255900",
  appId: "1:8596255900:web:28e5b110735102dcf16959"
};

const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Cloud Firestore
export const db = getFirestore(app);
