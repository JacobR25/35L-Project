import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCAT5Vw6f58tvjlzfucN7KPgwpwiVpRlyA",
  authDomain: "house-helpers-4f2e3.firebaseapp.com",
  projectId: "house-helpers-4f2e3",
  storageBucket: "house-helpers-4f2e3.appspot.com",
  messagingSenderId: "408092054130",
  appId: "1:408092054130:web:de32d36bb05880e50d28eb",
  measurementId: "G-CXNJQFBRH0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
