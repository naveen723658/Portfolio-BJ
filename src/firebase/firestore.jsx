import {
  connectFirestoreEmulator,
  doc,
  getFirestore,
} from "firebase/firestore";
import app from "./app";

const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8080);

export default db;
