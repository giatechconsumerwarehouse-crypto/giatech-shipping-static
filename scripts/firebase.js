// scripts/firebase.js
// Modular Firebase init for Realtime Database + Auth (v9+)
// Replace the firebaseConfig object with your actual values from Firebase Console > Project Settings

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4rtE-D8HT4BxUjAz-opq1S2y8OeXzBXw",                 // <- replace if needed
  authDomain: "giatech-shipping.firebaseapp.com",
  databaseURL: "https://giatech-shipping-default-rtdb.firebaseio.com",
  projectId: "giatech-shipping",
  storageBucket: "giatech-shipping.appspot.com",
  messagingSenderId: "906996624627",
  appId: "1:906996624627:web:9d8b8cfa4e210202009b86"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Export so other scripts can import: `import { db, auth } from './firebase.js'`
export { db, auth };
