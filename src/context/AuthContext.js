"use client";
import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import auth from "@/firebase/auth";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="m-0 p-0 font-sans text-base antialiased font-normal leading-default bg-gray-200 w-full min-h-screen flex justify-center items-center">
          <div>
            <img
              src="/images/loader/loader.svg"
              alt="loader"
              className="w-32 h-32 object-contain"
            />
            <h1 className="font-bold text-2xl text-slate-700 mt-2">
              Loading...
            </h1>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
