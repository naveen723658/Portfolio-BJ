import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useState, createContext } from "react";
import app from "./app";

export const AuthContext = createContext();

export const auth = getAuth(app);
