import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage"; //
import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../slice/modalSlice";
import loaderSlice from "../slice/loaderSlice";
import userSlice from "../slice/userSlice";
import toastSlice from "../slice/toastSlice";
import authSlice from "../slice/authSlice";

const serializeTransform = createTransform(
  (inboundState, key) => {
    if (key === "user" || key === "auth") {
      const sanitizedState = { ...inboundState };
      if (sanitizedState.user && typeof sanitizedState.user === "object") {
        Object.keys(sanitizedState.user).forEach((field) => {
          if (typeof sanitizedState.user[field] === "function") {
            delete sanitizedState.user[field];
          }
          if (sanitizedState.user[field] instanceof Date) {
            sanitizedState.user[field] =
              sanitizedState.user[field].toISOString();
          }
        });
      }
      return sanitizedState;
    }
    return inboundState;
  },
  (outboundState, key) => outboundState,
  { whitelist: ["user", "auth"] }
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth"],
  transforms: [serializeTransform],
};

// const Store = configureStore({
//   reducer: {
//     modal: modalSlice,
//     loader: loaderSlice,
//     user: userSlice,
//     toast: toastSlice,
//     auth: authSlice,
//   },
// });

const rootReducer = combineReducers({
  modal: modalSlice,
  loader: loaderSlice,
  user: userSlice,
  toast: toastSlice,
  auth: authSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
