import { createSlice } from "@reduxjs/toolkit";

const storedTitle = localStorage.getItem("title");
const initialTitle = storedTitle || "Dashboard";

export const titleSlice = createSlice({
  name: "title",
  initialState: {
    value: initialTitle,
  },

  reducers: {
    changeTitle: (state, action) => {
      state.value = action.payload;

      localStorage.setItem("title", action.payload);
    },
  },
});

export const { changeTitle } = titleSlice.actions;

export const selectTitle = (state) => state.title.value;

export default titleSlice.reducer;
