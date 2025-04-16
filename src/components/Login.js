import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { showLoader, hideLoader } from "../slice/loaderSlice";
import Analysis from "../utils/Analysis";
import { getAuthorization, userLogin } from "../api/apiData";
import { addUserData } from "../slice/userSlice";
import { addAuthorization } from "../slice/authSlice";
import LoginAsAdmin from "./LoginAsAdmin";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProfile, setLoginProfile] = useState("family");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await userLogin({
        emailId: mail,
        password: password,
      });
      if (response?.messageType == "E") {
        console.log(response.message);
      } else if (response) {
        const authResponse = await getAuthorization(response?.id);
        if (authResponse?.messageType == "S") {
          dispatch(addAuthorization(authResponse?.data));
        }
        dispatch(addUserData(response));
        navigate("/dashboard");
      }
    } catch (err) {}
  };
  useEffect(() => {
    // if (user) {
    //   navigate("/dashboard");
    // }
  }, []);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-800 text-white">
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-16">
        {loginProfile == "family" ? (
          <div className="w-full max-w-md bg-gray-900 bg-opacity-60 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-white">
                Education Assessment
              </h2>
              <p className="text-gray-400 mt-2">Sign in to continue</p>
            </div>
            <div className="flex flex-col gap-3">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <div className="text-sm text-right">
                <a
                  href="#"
                  className="text-blue-400 hover:text-green-400 transition duration-200"
                >
                  Forgot your password?
                </a>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  className="w-full bg-blue-600 hover:bg-green-500 text-white font-semibold py-3 rounded-full shadow-md transition duration-300"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                <button
                  className="w-full bg-blue-600 hover:bg-green-500 text-white font-semibold py-3 rounded-full shadow-md transition duration-300"
                  onClick={() => setLoginProfile("Admin")}
                >
                  Sign in as Admin
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 mt-8">
              © 2025-2026 All rights reserved.
            </p>
          </div>
        ) : (
          <>
            <LoginAsAdmin signInClick={(e) => setLoginProfile(e)} />
          </>
        )}
      </div>
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gray-900">
        <Analysis />
      </div>
    </div>
  );
};

export default Login;
