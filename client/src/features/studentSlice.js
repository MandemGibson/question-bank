import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "questions/fetchStudents",
  async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/students");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("There is an error:", error);
      throw error;
    }
  }
);

const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    schoolStudents: (state, action) => {
      state.students = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { newStudents } = studentSlice.actions;

export const selectStudents = (state) => state.student.students;

export default studentSlice.reducer;
