import React from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { RiDashboardFill } from "react-icons/ri";
import { SiOpenai } from "react-icons/si";
import { Avatar } from "@mui/material";
import { GrResources } from "react-icons/gr";
import { MdAssessment } from "react-icons/md";
const Sidebar = ({ children }) => {
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
      link: "/notifications",
    },
    { icon: <MdAssessment style={{ fontSize: "28px" }} />, link: "/analytics" },
    { icon: <GrResources style={{ fontSize: "28px" }} />, link: "/chat" },
    {
      icon: <SiOpenai style={{ fontSize: "28px" }} />,
      link: "/connections",
    },
    {
      icon: <Avatar alt="Remy Sharp" sx={{ width: 35, height: 35 }} />,
      link: "/profile",
    },
  ];
  return (
    <div className="flex h-screen w-full flex-col bg-gray-900 text-white">
      <div className="flex w-full flex-1 overflow-hidden">
        <div className="fixed left-2 top-1/2 transform -translate-y-1/2 flex flex-col h-fit border-[1px] border-gray-700 w-[60px] rounded-3xl justify-center items-center gap-6 bg-gray-800 bg-opacity-60 backdrop-blur-md z-10 shadow-lg p-3">
          {icons.map((iconinfo, index) => (
            <Link
              to={iconinfo.link}
              className="transition-transform duration-300 transform hover:scale-110 hover:text-blue-400"
              key={index + iconinfo.link}
            >
              {iconinfo.icon}
            </Link>
          ))}
        </div>
        <div className="flex-1 pl-20 overflow-auto max-h-full flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
