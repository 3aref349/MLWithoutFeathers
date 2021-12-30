import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth";
import  contactReducer from "./contacts"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts : contactReducer,
  },
  middleware: [...getDefaultMiddleware()],
});
