import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getAuth,
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyClBAPc2bn2gQ6BqZA1ZtapHCLTc-wuy0Q",
  authDomain: "ksports-abc1d.firebaseapp.com",
  projectId: "ksports-abc1d",
  storageBucket: "ksports-abc1d.firebasestorage.app",
  messagingSenderId: "422467856270",
  appId: "1:422467856270:web:19b94a2c50240fb8fa66df"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);