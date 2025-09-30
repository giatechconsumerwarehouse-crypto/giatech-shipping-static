// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// ✅ Your Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyD4rtE-D8HT4BxUjAz-opq1S2y8OeXzBXw",
  authDomain: "giatech-shipping.firebaseapp.com",
  databaseURL: "https://giatech-shipping-default-rtdb.firebaseio.com",
  projectId: "giatech-shipping",
  storageBucket: "giatech-shipping.firebasestorage.app",
  messagingSenderId: "906996624627",
  appId: "1:906996624627:web:9d8b8cfa4e210202009b86"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Get Realtime Database instance
const db = getDatabase(app);

// ✅ Export db so tracking.js and admin.js can use it
export { db };
