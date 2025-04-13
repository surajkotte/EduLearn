import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: { message: null, messageType: null },
  reducers: {
    addToast: (state, action) => {
      return {
        message: action.payload?.message,
        messageType: action.payload?.messageType,
      };
    },
    clearToast: (state, action) => {
      return { message: null, messageType: null };
    },
  },
});

export const { addToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
