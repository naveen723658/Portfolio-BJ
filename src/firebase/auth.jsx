import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useState, createContext } from "react";
import app from "./app";

export const AuthContext = createContext();

export const auth = getAuth(app);

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
