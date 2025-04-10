import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: null,
  reducers: {
    addUserData: (state, action) => {
      return action.payload;
    },
    clearUserData: (state, action) => {
      return null;
    },
  },
});

export const { addUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
