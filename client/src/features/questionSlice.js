import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/questions");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("There is an error:", error);
      throw error;
    }
  }
);

const initialState = {
  questions: [],
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
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { newQuestions } = questionSlice.actions;

export const selectQuestion = (state) => state.question.questions;

export default questionSlice.reducer;
