import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../slice/modalSlice";
import loaderSlice from "../slice/loaderSlice";
import userSlice from "../slice/userSlice";
const Store = configureStore({
  reducer: {
    modal: modalSlice,
    loader: loaderSlice,
    user: userSlice,
  },
});

export default Store;
