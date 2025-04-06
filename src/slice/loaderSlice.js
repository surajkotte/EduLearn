import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loading",
  initialState: { isLoading: false },
  reducers: {
    showLoader: (state, action) => {
      state.isLoading = true;
    },
    hideLoader: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
