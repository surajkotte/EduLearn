import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import Analysis from "../utils/Analysis";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../slice/toastSlice";
import { userSignup } from "../api/apiData";
import { hideLoader, showLoader } from "../slice/loaderSlice";
import EduImage from "../Misc/EduImage.json";

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
  const userCategories = ["Student", "Teacher", "Admin", "Parent"];
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
              select
              fullWidth
              label="User Type"
              variant="outlined"
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
            >
              {userCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
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
      <div className=" md:flex w-full md:w-1/2 items-center justify-center bg-gray-900">
        {/* <Analysis file={EduImage} /> */}
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import { TextField, MenuItem } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addToast } from "../slice/toastSlice";
// import { userSignup } from "../api/apiData";
// import { hideLoader, showLoader } from "../slice/loaderSlice";
// import Lottie from "react-lottie";
// import animationData from "../Misc/EduImage.json"; // Ensure this path is correct

// const Signup = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [inputData, setInputData] = useState({
//     organization: "",
//     firstName: "",
//     lastName: "",
//     emailId: "",
//     password: "",
//     userCategory: "",
//   });

//   const userCategories = ["Student", "Teacher", "Administrator", "Parent"];

//   const handleSignUp = async () => {
//     dispatch(showLoader());
//     try {
//       const response = await userSignup(inputData);
//       if (response?.messageType === "S") {
//         dispatch(
//           addToast({ messageType: "S", message: "User Created Successfully" })
//         );
//         navigate("/login");
//       } else {
//         dispatch(addToast({ messageType: "E", message: response?.message }));
//       }
//     } catch (err) {
//       dispatch(addToast({ messageType: "E", message: err?.message }));
//     } finally {
//       dispatch(hideLoader());
//     }
//   };

//   // Default options for react-lottie
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row  bg-gray-900 bg-gradient-to-br text-white">
//       {/* Left Section - Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">
//         <div className="w-full max-w-md bg-opacity-90 bg-gray-900 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
//           <div className="mb-6 text-center">
//             <h2 className="text-3xl font-bold text-gray-800">
//               Education Assessment
//             </h2>
//             <p className="text-gray-500 mt-2">
//               Create your account to continue
//             </p>
//           </div>
//           <div className="flex flex-col gap-4">
//             <TextField
//               fullWidth
//               label="Organization"
//               variant="outlined"
//               value={inputData?.organization}
//               onChange={(e) =>
//                 setInputData((prev) => ({
//                   ...prev,
//                   organization: e.target.value,
//                 }))
//               }
//               InputLabelProps={{ style: { color: "#6b7280" } }}
//               InputProps={{ style: { color: "#1f2937" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#d1d5db" },
//                   "&:hover fieldset": { borderColor: "#9ca3af" },
//                   "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
//                 },
//               }}
//             />
//             <div className="flex justify-between gap-3">
//               <TextField
//                 fullWidth
//                 label="First Name"
//                 variant="outlined"
//                 value={inputData?.firstName}
//                 onChange={(e) =>
//                   setInputData((prev) => ({
//                     ...prev,
//                     firstName: e.target.value,
//                   }))
//                 }
//                 InputLabelProps={{ style: { color: "#6b7280" } }}
//                 InputProps={{ style: { color: "#1f2937" } }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#d1d5db" },
//                     "&:hover fieldset": { borderColor: "#9ca3af" },
//                     "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Last Name"
//                 variant="outlined"
//                 value={inputData?.lastName}
//                 onChange={(e) =>
//                   setInputData((prev) => ({
//                     ...prev,
//                     lastName: e.target.value,
//                   }))
//                 }
//                 InputLabelProps={{ style: { color: "#6b7280" } }}
//                 InputProps={{ style: { color: "#1f2937" } }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": { borderColor: "#d1d5db" },
//                     "&:hover fieldset": { borderColor: "#9ca3af" },
//                     "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
//                   },
//                 }}
//               />
//             </div>
//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               value={inputData?.emailId}
//               onChange={(e) =>
//                 setInputData((prev) => ({
//                   ...prev,
//                   emailId: e.target.value,
//                 }))
//               }
//               InputLabelProps={{ style: { color: "#6b7280" } }}
//               InputProps={{ style: { color: "#1f2937" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#d1d5db" },
//                   "&:hover fieldset": { borderColor: "#9ca3af" },
//                   "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
//                 },
//               }}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               variant="outlined"
//               type="password"
//               value={inputData?.password}
//               onChange={(e) =>
//                 setInputData((prev) => ({
//                   ...prev,
//                   password: e.target.value,
//                 }))
//               }
//               InputLabelProps={{ style: { color: "#6b7280" } }}
//               InputProps={{ style: { color: "#1f2937" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#d1d5db" },
//                   "&:hover fieldset": { borderColor: "#9ca3af" },
//                   "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
//                 },
//               }}
//             />
//             <TextField
//               select
//               fullWidth
//               label="User Type"
//               variant="outlined"
//               value={inputData?.userCategory}
//               onChange={(e) =>
//                 setInputData((prev) => ({
//                   ...prev,
//                   userCategory: e.target.value,
//                 }))
//               }
//               InputLabelProps={{ style: { color: "#6b7280" } }}
//               InputProps={{ style: { color: "#1f2937" } }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#d1d5db" },
//                   "&:hover fieldset": { borderColor: "#9ca3af" },
//                   "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
//                 },
//               }}
//             >
//               {userCategories.map((category) => (
//                 <MenuItem key={category} value={category}>
//                   {category}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </div>
//           <div className="mt-6">
//             <button
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full shadow-md transition duration-300"
//               onClick={handleSignUp}
//             >
//               Sign Up
//             </button>
//           </div>
//           <p className="text-center text-xs text-gray-500 mt-6">
//             Already have an account?{" "}
//             <a href="/login" className="text-blue-600 hover:underline">
//               Log in
//             </a>
//           </p>
//           <p className="text-center text-xs text-gray-500 mt-2">
//             © 2025-2026 All rights reserved.
//           </p>
//         </div>
//       </div>

//       {/* Right Section - Lottie Animation */}
//       <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gray-100">
//         {/* <div className="text-center">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">
//             Welcome to Education Hub
//           </h3>
//           {animationData ? (
//             <Lottie
//               options={defaultOptions}
//               height={400}
//               width={400}
//               isStopped={false}
//               isPaused={false}
//             />
//           ) : (
//             <p className="text-red-500">Animation data not loaded.</p>
//           )}
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Signup;
