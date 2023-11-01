import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchClass = createAsyncThunk("level/fetchClass", async () => {
  try {
    const response = await axios.get("http://localhost:3005/api/levels");
    return response.data;
  } catch (error) {
    console.error("Error occured whiles fetching questions:", error);
  }
});

const initialState = {
  level: [],
};

const classSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    existingClass: (state, action) => {
      state.level = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchClass.fulfilled, (state, action) => {
        state.level = action.payload;
      })
      .addCase(fetchClass.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { existingClass } = classSlice.actions;

export const selectClass = (state) => state.level.level;

export default classSlice.reducer;
