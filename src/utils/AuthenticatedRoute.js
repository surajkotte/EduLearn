import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "../components/Login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../slice/userSlice";
import { checkIsAuthenticated } from "../api/apiData";
const AuthenticatedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAUthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const getCookie = () => {
    const cookie = document.cookie;
    const cookieName = cookie.split("token=");
    if (cookieName.length >= 2) {
      return cookieName[1];
    } else {
      setIsAuthenticated(false);
      dispatch(clearUserData());
      return false;
    }
  };
  const refreshToken = async () => {
    try {
      const response = await checkIsAuthenticated();
      if (response?.messageType == "E") {
        setIsAuthenticated(false);
        dispatch(clearUserData());
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
      dispatch(clearUserData());
    }
  };
  const checkToken = () => {
    const token = getCookie();
    if (!token) {
      setIsAuthenticated(false);
      dispatch(clearUserData());
      navigate("/login");
    }
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(clearUserData());
        setIsAuthenticated(false);
        return false;
      } else {
        setIsAuthenticated(true);
      }
      const timeToExpiration = decoded.exp - currentTime;
      if (timeToExpiration < 300) {
        refreshToken(token);
      }
      const nextCheckDelay = Math.max(timeToExpiration - 300, 1) * 1000;
      setTimeout(checkToken, nextCheckDelay);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      dispatch(clearUserData());
      setIsAuthenticated(false);
      return false;
    }
  };
  useEffect(() => {
    const isValid = checkToken();
    if (isValid) {
      // Initial scheduling based on token expiration
      const cookie = document.cookie;
      const cookieName = cookie.split("token=");
      if (cookieName.length >= 2) {
        const decoded = jwtDecode(cookieName[1]);
        const timeToExpiration = decoded.exp - Date.now() / 1000;
        const nextCheckDelay = Math.max(timeToExpiration - 300, 1) * 1000;
        const timeoutId = setTimeout(checkToken, nextCheckDelay);
        return () => clearTimeout(timeoutId); // Cleanup on unmount
      } else {
        setIsAuthenticated(false);
        dispatch(clearUserData());
      }
    }
  });
  return isAUthenticated ? children : <Login />;
};

export default AuthenticatedRoute;
