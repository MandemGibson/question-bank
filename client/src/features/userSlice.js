import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   try {
//     const response = await axios.get("http://localhost:3005/api/auth");
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// });

const initialState = {
  users: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      state.users = action.payload;
    },
    logout: (state) => {
      state.users = null;
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUsers.fulfilled, (state, action) => {
  //       state.users = action.payload;
  //     })
  //     .addCase(fetchUsers.rejected, (state, action) => {
  //       state.error = action.error.message;
  //     });
  // },
});

export const { login, logout } = userSlice.actions;

export const selectUsers = (state) => state.users.user;

export default userSlice.reducer;
