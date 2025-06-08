import { configureStore } from "@reduxjs/toolkit";
import authReduceer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReduceer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
