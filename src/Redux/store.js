import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../slice/modalSlice";
import loaderSlice from "../slice/loaderSlice";
const Store = configureStore({
  reducer: {
    modal: modalSlice,
    loader: loaderSlice,
  },
});

export default Store;
