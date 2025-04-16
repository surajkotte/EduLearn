import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../api/apiData";
const GroupUserDahboard = () => {
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await getAllUsers(user?.organizationId, "Admin");
    };
    fetchData();
  }, []);
  return <div>GroupUserDahboard</div>;
};

export default GroupUserDahboard;
