import { createSlice } from "@reduxjs/toolkit";

// export const updateUser = (userId) => ({
//   type: "users/updateUser",
//   payload: { userId },
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
    // updateUser: (state, action) => {
    //   const updatedUser = state.users.patch()
    // }
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.users;

export default userSlice.reducer;
