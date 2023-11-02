"use client"
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerRecord/playerState";

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
