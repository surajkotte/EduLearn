// import { createVisit } from '@/constants/apis'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log(action);
      return { key: action.payload };
    },
    closeModal: () => {
      return { key: null };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
