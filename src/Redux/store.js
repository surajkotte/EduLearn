import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../slice/modalSlice";
import loaderSlice from "../slice/loaderSlice";
import userSlice from "../slice/userSlice";
import toastSlice from "../slice/toastSlice";
import authSlice from "../slice/authSlice";
const Store = configureStore({
  reducer: {
    modal: modalSlice,
    loader: loaderSlice,
    user: userSlice,
    toast: toastSlice,
    auth: authSlice,
  },
});

export default Store;
