// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
   apiKey: "AIzaSyAWSILkwzCTL79vsHFh_8xOCUgj_zR9MoI",
  authDomain: "beats-and-bingo-v2.firebaseapp.com",
  databaseURL: "https://beats-and-bingo-v2-default-rtdb.firebaseio.com",
  projectId: "beats-and-bingo-v2",
  storageBucket: "beats-and-bingo-v2.firebasestorage.app",
  messagingSenderId: "751367901750",
  appId: "1:751367901750:web:92c9517375f68b02213e97"
};

// Don't change below
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
