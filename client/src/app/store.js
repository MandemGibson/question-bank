import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "../features/titleSlice";

export const store = configureStore({
  reducer: {
    title: titleReducer,
  },
});
