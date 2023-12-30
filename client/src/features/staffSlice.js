import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStaffs = createAsyncThunk("staffs/fetchStaffs", async () => {
  try {
    const sessionId = JSON.parse(localStorage.getItem("sessionId"));
    const response = await axios.get("http://localhost:3005/api/staffs", {
      headers: {
        Authorization: `Bearer ${sessionId.sessionId}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occured:", error);
  }
});

export const removeStaff = (staffId) => ({
  type: "staffs/removeStaff",
  payload: { staffId },
});

const initialState = {
  staffs: [],
};

const staffSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    schoolStaff: (state, action) => {
      state.staffs = action.payload;
    },
    removeStaff: (state, action) => {
      const updatedStaff = state.staffs.filter(
        (staff) => staff.id !== action.payload.staffId
      );
      state.staffs = updatedStaff;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        state.staffs = action.payload;
      })
      .addCase(fetchStaffs.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { schoolStaff } = staffSlice.actions;

export const selectStaff = (state) => state.staff.staffs;

export default staffSlice.reducer;
