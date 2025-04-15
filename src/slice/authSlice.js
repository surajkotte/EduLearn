import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    addAuthorization: (state, action) => {
      return action.payload;
    },
    clearAuthorization: (state, action) => {
      return null;
    },
  },
});
export const { addAuthorization, clearAuthorization } = authSlice.actions;

export default authSlice.reducer;
