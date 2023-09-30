import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "../features/titleSlice";
import questionReducer from "../features/questionSlice";

export const store = configureStore({
  reducer: {
    title: titleReducer,
    question: questionReducer,
  },
});
