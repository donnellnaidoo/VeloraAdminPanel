import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApPI1iCwIJnDpFhlAj1mnGF2l8L-ENMA4",
  authDomain: "safeher-hackathon.firebaseapp.com",
  projectId: "safeher-hackathon",
  storageBucket: "safeher-hackathon.appspot.com",
  messagingSenderId: "925215973182",
  appId: "1:925215973182:web:ffc5fcae8b6e17ac9fd66f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  // Initialize Firestore
