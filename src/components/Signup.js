import React, { useState } from "react";
import { TextField } from "@mui/material";
import Analysis from "../utils/Analysis";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../slice/toastSlice";
import { userSignup } from "../api/apiData";
import { hideLoader, showLoader } from "../slice/loaderSlice";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    organization: "",
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    userCategory: "",
  });
  const handleSignUp = async () => {
    dispatch(showLoader());
    try {
      const response = await userSignup(inputData);
      if (response?.messageType == "S") {
        dispatch(
          addToast({ messageType: "S", message: "User Created Succesfully" })
        );
        navigate("/login");
      } else {
        dispatch(addToast({ messageType: "E", message: response?.message }));
      }
    } catch (err) {
      dispatch(addToast({ messageType: "E", message: err?.message }));
    } finally {
      dispatch(hideLoader());
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-800 text-white">
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-lg bg-gray-900 bg-opacity-60 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-white">
              Education Assessment
            </h2>
            <p className="text-gray-400 mt-2">Sign up to continue</p>
          </div>
          <div className="flex flex-col gap-3">
            <TextField
              fullWidth
              label="Organization"
              variant="outlined"
              value={inputData?.organization}
              onChange={(e) =>
                setInputData((prev) => ({
                  ...prev,
                  organization: e.target.value,
                }))
              }
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#4ade80" },
                },
              }}
            />
            <div className="flex justify-between gap-2">
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={inputData?.firstName}
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#666" },
                    "&:hover fieldset": { borderColor: "#888" },
                    "&.Mui-focused fieldset": { borderColor: "#4ade80" },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={inputData?.lastName}
                onChange={(e) =>
                  setInputData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#666" },
                    "&:hover fieldset": { borderColor: "#888" },
                    "&.Mui-focused fieldset": { borderColor: "#4ade80" },
                  },
                }}
              />
            </div>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={inputData?.emailId}
              onChange={(e) =>
                setInputData((prev) => ({
                  ...prev,
                  emailId: e.target.value,
                }))
              }
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#4ade80" },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={inputData?.password}
              onChange={(e) =>
                setInputData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#4ade80" },
                },
              }}
            />
            <TextField
              fullWidth
              label="User Type"
              variant="outlined"
              type="password"
              value={inputData?.userCategory}
              onChange={(e) =>
                setInputData((prev) => ({
                  ...prev,
                  userCategory: e.target.value,
                }))
              }
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#4ade80" },
                },
              }}
            />
          </div>
          <div className="mt-3">
            <div className="space-y-3 pt-2">
              <button
                className="w-full bg-blue-600 hover:bg-green-500 text-white font-semibold py-3 rounded-full shadow-md transition duration-300"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-8">
            © 2025-2026 All rights reserved.
          </p>
        </div>
      </div>
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gray-900">
        {/* <Analysis /> */}
      </div>
    </div>
  );
};

export default Signup;
