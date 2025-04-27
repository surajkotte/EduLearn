import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "../components/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../slice/userSlice";
import { checkIsAuthenticated } from "../api/apiData";
import { navigate } from "react-router-dom";
const AuthenticatedRoute = ({ children }) => {
  const navigate = useNavigate();
  const loader = useSelector((state) => state.loader);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      if (response?.messageType === "E") {
        dispatch(clearUserData());
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
    } catch (err) {
      dispatch(clearUserData());
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const checkToken = async () => {
    const token = getCookie();
    if (!token) {
      setIsAuthenticated(false);
      dispatch(clearUserData());
      navigate("/login");
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(clearUserData());
        setIsAuthenticated(false);
        navigate("/login");
        return false;
      }

      if (decoded.exp - currentTime < 300) {
        await refreshToken();
      }
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      dispatch(clearUserData());
      setIsAuthenticated(false);
      navigate("/login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
    const interval = setInterval(checkToken, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return isAuthenticated == true ? children : <Login />;
};

export default AuthenticatedRoute;
