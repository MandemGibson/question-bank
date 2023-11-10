import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchResult = createAsyncThunk("results/fetchResult", async () => {
  try {
    const result = await axios.get("http://localhost:3005/api/results");
    return result.data;
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  results: [],
};

const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    newResults: (state, action) => {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResult.fulfilled, (state, action) => {
        state.results = action.payload;
      })
      .addCase(fetchResult.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { newResults } = resultSlice.actions;

export const selectResults = (state) => state.results.results;

export default resultSlice.reducer;
