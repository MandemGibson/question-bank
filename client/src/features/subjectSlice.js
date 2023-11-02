import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubject = createAsyncThunk(
  "subjects/fetchSubject",
  async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/subjects");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  subjects: [],
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    existingSubjects: (state, action) => {
      state.subjects = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSubject.fulfilled, (state, action) => {
        state.subjects = action.payload;
      })
      .addCase(fetchSubject.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { existingSubjects } = subjectSlice.actions;

export const selectSubject = (state) => state.subjects.subjects;

export default subjectSlice.reducer;
