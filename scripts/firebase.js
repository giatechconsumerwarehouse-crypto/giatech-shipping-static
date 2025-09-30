// scripts/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4rtE-D8HT4BxUjAz-opq1S2y8OeXzBXw",
  authDomain: "giatech-shipping.firebaseapp.com",
  databaseURL: "https://giatech-shipping-default-rtdb.firebaseio.com",
  projectId: "giatech-shipping",
  storageBucket: "giatech-shipping.firebasestorage.app",
  messagingSenderId: "906996624627",
  appId: "1:906996624627:web:9d8b8cfa4e210202009b86"
};

// Init
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
