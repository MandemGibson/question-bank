import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "../features/titleSlice";
import questionReducer from "../features/questionSlice";
import staffReducer from "../features/staffSlice";
import studentReducer from "../features/studentSlice";
import userReducer from "../features/userSlice";
import classReducer from "../features/classSlice";
import subjectReducer from "../features/subjectSlice";
import resultReducer from "../features/resultSlice";

export const store = configureStore({
  reducer: {
    title: titleReducer,
    question: questionReducer,
    staff: staffReducer,
    student: studentReducer,
    user: userReducer,
    level: classReducer,
    subjects: subjectReducer,
    results: resultReducer,
  },
});
