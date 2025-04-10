import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkIsAuthenticated } from "../api/apiData";
import { clearUserData } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import Dashboard from "../components/Dashboard";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();
  const check = async () => {
    try {
      const response = await checkIsAuthenticated();
      if (response?.messageType == "E") {
        dispatch(clearUserData());
        setUserInfo("");
      } else {
        setUserInfo(user);
      }
    } catch (err) {
      dispatch(clearUserData());
      setUserInfo("");
    }
  };
  useEffect(() => {
    check();
  }, []);
  if (!userInfo) {
    return children;
  }
};

export default ProtectedRoute;
