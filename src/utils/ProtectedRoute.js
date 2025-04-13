import React, { useEffect, useState } from "react";
import { checkIsAuthenticated } from "../api/apiData";
import { clearUserData } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const check = async () => {
    try {
      const response = await checkIsAuthenticated();
      if (response?.messageType == "E") {
        dispatch(clearUserData());
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } catch (err) {
      dispatch(clearUserData());
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    check();
  }, []);
  if (!isLoggedIn) {
    return children;
  } else {
    navigate("/dashboard");
  }
};

export default ProtectedRoute;
