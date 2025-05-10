import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { RiDashboardFill } from "react-icons/ri";
import { SiOpenai } from "react-icons/si";
import { Avatar } from "@mui/material";
import { TiGroupOutline } from "react-icons/ti";
import { MdOutlineAnalytics } from "react-icons/md";
import { persistor } from "../Redux/store";
import { userLogout } from "../api/apiData";
import { useDispatch } from "react-redux";
import { addToast } from "../slice/toastSlice";
import { clearUserData } from "../slice/userSlice";
import { clearAuthorization } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { GrUserAdmin } from "react-icons/gr";
import checkIsAuthorized from "../utils/checkIsAuthorized";
const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const icons = [
    {
      icon: <HomeOutlined style={{ fontSize: "28px" }} />,
      link: "/dashboard",
    },
    {
      icon: (
        <div className="relative">
          <RiDashboardFill style={{ fontSize: "32px" }} />
        </div>
      ),
      link: "/createNewModules",
    },
    {
      icon: <TiGroupOutline style={{ fontSize: "28px" }} />,
      link: "/groupUsers",
    },
    {
      icon: <MdOutlineAnalytics style={{ fontSize: "30px" }} />,
      link: "/analytics",
    },
    {
      icon: <GrUserAdmin style={{ fontSize: "28px" }} />,
      link: "/assignModules",
    },
    {
      icon: <SiOpenai style={{ fontSize: "28px" }} />,
      link: "/connections",
    },
    {
      icon: <Avatar alt="Remy Sharp" sx={{ width: 35, height: 35 }} />,
      link: "/profile",
    },
  ];
  const handleLogout = async () => {
    const response = await userLogout();
    if (response.messageType == "S") {
      dispatch(addToast({ messageType: "S", message: "Logout Successfull" }));
      dispatch(clearUserData());
      dispatch(clearAuthorization());
      //localStorage.removeItem("persist:root");
      persistor.purge();
      navigate("/login");
    } else {
      dispatch(addToast({ messageType: "E", message: response?.message }));
    }
  };
  return (
    <div className="flex h-screen w-full flex-col bg-gray-900 text-white">
      <div className="flex w-full flex-1 overflow-hidden">
        <div className="fixed left-2 top-1/2 transform -translate-y-1/2 flex flex-col h-fit border-[1px] border-gray-700 w-[60px] rounded-3xl justify-center items-center gap-6 bg-gray-800 bg-opacity-60 backdrop-blur-md z-10 shadow-lg p-3">
          {icons.map(
            (iconinfo, index) =>
              checkIsAuthorized(iconinfo, user) == true && (
                <Link
                  to={iconinfo.link}
                  className="transition-transform duration-300 transform hover:scale-110 hover:text-blue-400"
                  key={index + iconinfo.link}
                >
                  {iconinfo.icon}
                </Link>
              )
          )}
          <button onClick={handleLogout}>
            <IoIosLogOut
              style={{ fontSize: "28px" }}
              className="transition-transform duration-300 transform hover:scale-110 hover:text-blue-400 hover:cursor-pointer"
            />
          </button>
        </div>
        <div className="flex-1 pl-20 overflow-auto max-h-full flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
