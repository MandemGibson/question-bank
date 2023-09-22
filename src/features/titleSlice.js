import { createSlice } from "@reduxjs/toolkit";

export const titleSlice = createSlice({
  name: "title",
  initialState: {
    value: "Dashboard",
  },

  reducers: {
    changeTitle: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeTitle } = titleSlice.actions;

export const selectTitle = (state) => state.title.value;

export default titleSlice.reducer;
