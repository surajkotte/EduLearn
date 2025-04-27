import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAllUsersByOrg, getAuthorization } from "../../api/apiData";
import { useSelector, useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../slice/loaderSlice";
import Modal from "../../utils/modal";
import { openModal, closeModal } from "../../slice/modalSlice";

import UserDetailsCard from "./UserDetailsCard";

const Assignmodule = () => {
  const [users, setUsers] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    id: "",
    userDetails: "",
    authorizations: "",
  });
  const [authorizations, setAuthorizations] = useState("");
  const user = useSelector((store) => store.user);
  const loader = useSelector((store) => store.loader);
  const dispatch = useDispatch();
  const fetchUsers = async (organizationId) => {
    const response = await getAllUsersByOrg(organizationId);
    if (response?.messageType === "S") {
      setUsers(response?.data);
    }
  };

  useEffect(() => {
    fetchUsers(user?.organizationId);
  }, []);

  const fetchAuthorizations = async () => {
    dispatch(showLoader());
    const response = await getAuthorization(selectedUser.id);
    if (response?.messageType === "S") {
      console.log("response", response.data);
      //setSelectedUser((prev) => ({ ...prev, authorizations: response.data }));
      setAuthorizations(response?.data);
    }
    dispatch(hideLoader());
  };

  useEffect(() => {
    if (selectedUser) {
      fetchAuthorizations();
    }
  }, [selectedUser]);

  return (
    <div className="p-6 min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-8">Maintain Authorizations</h1>

      {users?.length ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
          {users?.map((info) => (
            <div
              key={`AssignModule${info?._id}`}
              className="rounded-2xl bg-white p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    {info?.firstName + " " + info?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{info?.emailId}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    UserType : {info?.userCategory}
                  </p>
                </div>
                <Tooltip title="Remove user">
                  <Button size="small">
                    <DeleteIcon className="text-red-500" />
                  </Button>
                </Tooltip>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setSelectedUser({
                      name: info?.firstName + " " + info?.lastName,
                      id: info?._id,
                      userDetails: info,
                      //authorizations: "",
                    });
                    dispatch(openModal(info?._id));
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-full">
          No users found.
        </div>
      )}
      {!loader?.isLoading && selectedUser?.id && authorizations && (
        <Modal
          uniqueKey={selectedUser?.id}
          closeOnOutsideClick={false}
          title={`Authorizations for ${selectedUser.name}`}
          style={{ backgroundColor: "#1a202c" }}
          maxWidth="lg"
        >
          <UserDetailsCard
            userDetails={selectedUser?.userDetails}
            userAuthorizations={authorizations}
            closeClicked={() => {
              dispatch(closeModal());
              setSelectedUser({
                name: "",
                id: "",
                userDetails: "",
                authorizations: "",
              });
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Assignmodule;
