import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../slice/modalSlice";
import loaderSlice from "../slice/loaderSlice";
import userSlice from "../slice/userSlice";
import toastSlice from "../slice/toastSlice";
const Store = configureStore({
  reducer: {
    modal: modalSlice,
    loader: loaderSlice,
    user: userSlice,
    toast: toastSlice,
  },
});

export default Store;
