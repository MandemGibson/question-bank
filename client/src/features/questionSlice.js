import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const storedTitle = localStorage.getItem("title");
// const initialTitle = storedTitle || "Dashboard";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await axios.get("/api/questions");
    return response.data;
  }
);

const initialState = {
  questions: {},
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    newQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      return { ...state, questions: action.payload };
    });
  },
});

export const { newQuestions } = questionSlice.actions;

export const selectQuestion = (state) => state.questions.questions;

export default questionSlice.reducer;
