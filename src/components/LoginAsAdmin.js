import React, { useState } from "react";
import { TextField } from "@mui/material";
const LoginAsAdmin = ({ signInClick }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-full max-w-md bg-gray-900 bg-opacity-60 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-white">Education Assessment</h2>
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
            // onClick={handleLogin}
          >
            Sign In
          </button>
          <button
            className="w-full bg-blue-600 hover:bg-green-500 text-white font-semibold py-3 rounded-full shadow-md transition duration-300"
            onClick={() => signInClick("family")}
          >
            Sign in as Student or Parent or Staff
          </button>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-8">
        © 2025-2026 All rights reserved.
      </p>
    </div>
  );
};

export default LoginAsAdmin;
