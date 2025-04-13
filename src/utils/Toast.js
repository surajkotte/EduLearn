import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearToast } from "../slice/toastSlice";
const Toast = ({ children }) => {
  const [error, setError] = useState("");
  const toast = useSelector((store) => store.toast);
  const dispatch = useDispatch();
  var messageClass = "alert-info";
  useEffect(() => {
    if (toast?.message) {
      if (toast.messageType == "E") {
        messageClass = "alert-error";
      } else if (toast.messageType == "S") {
        messageClass = "alert-success";
      }
      messageClass + " " + toast?.messageType;
      setError({ message: toast.message, messageType: toast.messageType });
      const timer = setTimeout(() => {
        setError("");
        dispatch(clearToast());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);
  return (
    <>
      {error.message && (
        <div className=" fixed top-5 right-5 z-50">
          <div
            className={`${
              error.messageType === "S"
                ? "transition-all duration-500 px-4 py-3 rounded shadow-md text-sm w-fit max-w-md bg-green-500 text-white"
                : error.messageType === "E"
                ? "transition-all duration-500 px-4 py-3 rounded shadow-md text-sm w-fit max-w-xs bg-red-600 text-white"
                : "transition-all duration-500 px-4 py-3 rounded shadow-md text-sm w-fit max-w-xs bg-blue-600 text-white"
            }`}
          >
            <span>{error.message}</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default Toast;
