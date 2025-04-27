import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AuthorizationEditor from "./AuthorizationEditor";
import { addAuthorizations, UpdateUser } from "../../api/apiData";
import { useDispatch } from "react-redux";
import { addToast } from "../../slice/toastSlice";
import { closeModal } from "../../slice/modalSlice";
import { addAuthorization } from "../../slice/authSlice";
import { showLoader, hideLoader } from "../../slice/loaderSlice";
const UserDetailsCard = ({ userDetails, userAuthorizations, closeClicked }) => {
  const [authorizations, setAuthorizations] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const dispatch = useDispatch();
  const changeAuthorizations = (newAuthorizations) => {
    setAuthorizations(newAuthorizations);
  };
  const updateAuthorizations = () => {
    const response = addAuthorizations(
      userInfo._id,
      authorizations.actionAuthorization,
      authorizations.displayAuthorization
    );
    return response;
  };

  const updateUserData = async () => {
    const response = await UpdateUser(userInfo._id, userInfo);
    return response;
  };
  const saveClicked = async () => {
    const isUserDetailsUpdated = userDetails === userInfo;
    const isAuthorizationsUpdated = userAuthorizations === authorizations;
    if (isUserDetailsUpdated === false && isAuthorizationsUpdated === false) {
    } else if (isUserDetailsUpdated === false) {
      const userResponse = await updateUserData();
      if (userResponse?.messageType === "S") {
        dispatch(closeModal());
        dispatch(
          addToast({ messageType: "S", message: "User updated successfully" })
        );
      } else {
        dispatch(
          addToast({ messageType: "E", message: userResponse?.message })
        );
      }
    } else if (isAuthorizationsUpdated === false) {
      const authResponse = await updateAuthorizations();
      if (authResponse?.messageType === "S") {
        dispatch(closeModal());
        //dispatch(addAuthorization(authResponse?.data));
        dispatch(
          addToast({
            messageType: "S",
            message: "Authorizations updated successfully",
          })
        );
      } else {
        dispatch(
          addToast({ messageType: "E", message: authResponse?.message })
        );
      }
    }
  };
  useEffect(() => {
    setUserInfo(userDetails);
    setAuthorizations(userAuthorizations);
  }, [userDetails, userAuthorizations]);
  return (
    <div className="p-8 text-white">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="relative flex">
            <Avatar
              src={`https://png.pngtree.com/png-clipart/20240814/original/pngtree-3d-face-of-a-teacher-png-image_15771533.png`}
              alt="Profile Picture"
              sx={{ width: 120, height: 120 }}
              className="border-4 border-gray-700"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                //onChange={handleImageChange}
              />
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <textarea
              className="w-full h-32 p-4  border border-gray-600 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
              placeholder="About"
              value={userInfo?.about || ""}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, about: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TextField
            label="First Name"
            value={userInfo?.firstName || ""}
            fullWidth
            size="small"
            InputProps={{
              className: " text-white border-gray-600",
            }}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            InputLabelProps={{
              className: "text-gray-400",
            }}
            className="rounded-lg"
          />
          <TextField
            label="Last Name"
            value={userInfo?.lastName || ""}
            fullWidth
            size="small"
            InputProps={{
              className: " text-white border-gray-600",
            }}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            InputLabelProps={{
              className: "text-gray-400",
            }}
            className="rounded-lg"
          />
          <TextField
            label="Email"
            value={userInfo?.emailId || ""}
            fullWidth
            size="small"
            InputProps={{
              className: " text-white border-gray-600",
            }}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                emailId: e.target.value,
              }))
            }
            InputLabelProps={{
              className: "text-gray-400",
            }}
            className="rounded-lg"
          />
          <TextField
            type="date"
            label="Date of Birth"
            value={userInfo?.dateOfBirth || ""}
            fullWidth
            size="small"
            InputProps={{
              className: " text-white border-gray-600",
            }}
            InputLabelProps={{
              className: "text-gray-400",
            }}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                dateOfBirth: e.target.value,
              }))
            }
            className="rounded-lg"
          />
          <TextField
            label="Gender"
            value={userInfo?.gender || ""}
            fullWidth
            size="small"
            InputProps={{
              className: "text-white border-gray-600",
            }}
            InputLabelProps={{
              className: "text-gray-400",
            }}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex overflow-y-auto">
        {authorizations && (
          <AuthorizationEditor
            initialAuthorizations={authorizations}
            modifyAuthorizations={changeAuthorizations}
          />
        )}
      </div>
      <div className="flex justify-end mt-4 gap-4 items-center">
        <Button variant="contained" color="primary" onClick={closeClicked}>
          Close
        </Button>
        <Button variant="contained" color="primary" onClick={saveClicked}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default UserDetailsCard;
