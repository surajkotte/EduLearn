import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createnewGroup,
  getAllLearningModles,
  getAllUsers,
  getGroupes,
  getAssignedLearningModules,
} from "../../api/apiData";
import { closeModal, openModal } from "../../slice/modalSlice";
import { IoAddCircleOutline } from "react-icons/io5";
import { TextField, MenuItem, Button } from "@mui/material";
import Modal from "../../utils/modal";
import { addToast } from "../../slice/toastSlice";
import UpdateExistingGroup from "./UpdateExistingGroup";
import CreateNewGroup from "./CreateNewGroup";
import { CiEdit } from "react-icons/ci";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoAddOutline } from "react-icons/io5";
import AddLearningModules from "./AddLearningModules";
import { hideLoader, showLoader } from "../../slice/loaderSlice";
const GroupUserDashboard = () => {
  const [modelKey, setModelKey] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userRole, setUserRole] = useState("Student");
  const [learningModules, setLearningModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const loader = useSelector((store) => store.loader);
  const fetchLearningModules = async () => {
    dispatch(showLoader());
    const response = await getAllLearningModles(user?.organizationId, user?.id);
    if (response?.messageType === "S") {
      const modifiedData = response?.data?.map((info) => ({
        label: info?.name,
        value: info?._id,
      }));
      setLearningModules(modifiedData);
    }
    dispatch(hideLoader());
  };

  const fetchAssignedModules = async () => {
    dispatch(showLoader());
    const response = await getAssignedLearningModules(
      selectedCard,
      user?.organizationId
    );
    if (response?.messageType === "S") {
      const assigned = response?.data?.modules?.map((mod) => {
        const moduleInfo = learningModules.find(
          (lm) => lm.value === mod.moduleId.toString()
        );
        return {
          label: moduleInfo?.label || "Unknown",
          value: mod.moduleId,
          permissions: {
            read: mod.readAccess,
            write: mod.writeAccess,
          },
        };
      });
      setSelectedModule(assigned);
    }
    dispatch(hideLoader());
  };
  const saveNewGroup = async (selectedUsers, groupdetails) => {
    console.log(selectedUsers);
    try {
      if (!selectedUsers || selectedUsers.length === 0) {
        throw new Error("Please select at least one user");
      }
      const users = selectedUsers.map((inf) => inf?.value);
      const response = await createnewGroup({
        ...groupdetails,
        organizationId: user?.organizationId,
        users: users,
        userType: userRole,
      });
      if (response?.messageType === "S") {
        console.log(response);
        dispatch(
          addToast({
            messageType: "S",
            message: "New group created successfully",
          })
        );
        dispatch(closeModal(modelKey?.type));
        setGroupData((prev) => [...prev, response?.data]);
      } else {
        dispatch(addToast({ messageType: "E", message: response?.message }));
      }
    } catch (err) {
      dispatch(addToast({ messageType: "E", message: err?.message }));
    }
  };

  const fetchUsers = async (role) => {
    const response = await getAllUsers(user?.organizationId, role);
    if (response?.messageType === "S") {
      const users = response?.data.map((userInfo) => ({
        label: `${userInfo?.firstName} ${userInfo?.lastName}`,
        value: userInfo?._id,
      }));
      setUserDetails(users);
    }
  };

  useEffect(() => {
    fetchUsers(userRole);
  }, [userRole]);

  useEffect(() => {
    const fetchGroupes = async () => {
      dispatch(showLoader());
      const response = await getGroupes(user?.organizationId);
      if (response?.messageType === "S") {
        setGroupData(response?.data);
      }
      dispatch(hideLoader());
    };
    fetchGroupes();
  }, []);

  useEffect(() => {
    console.log(selectedCard + " " + learningModules?.length);
    if (selectedCard && learningModules?.length > 0) {
      fetchAssignedModules();
    }
  }, [learningModules]);

  useEffect(() => {
    if (selectedCard) {
      fetchLearningModules();
    }
  }, [selectedCard]);

  return (
    <div className="p-6 min-h-screen w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold ">Manage User Groups</h1>
        <div className="w-48">
          <TextField
            select
            label="User Role"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiInputBase-root": { color: "black" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
              "& .MuiInputLabel-root": { color: "#666" },
            }}
          >
            {["Student", "Staff", "Admin", "Parent"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          onClick={() => {
            setModelKey({ type: "newGroup", id: "" });
            dispatch(openModal("newGroup"));
          }}
          className="cursor-pointer rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 flex flex-col items-center justify-center text-blue-600 hover:scale-105 transition-transform shadow-sm"
        >
          <IoAddCircleOutline className="w-10 h-10 mb-2" />
          <span className="text-lg font-semibold">Create New Group</span>
        </div>

        {groupData?.map((data) => (
          <div
            key={data._id}
            className="rounded-xl bg-white p-5 shadow hover:scale-[1.02] transition-transform flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-blue-800">
                  {data.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Created by: {data?.createdUser?.firstName}{" "}
                  {data?.createdUser?.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  Participants: {data?.users?.length || 0}
                </p>
              </div>
              <Button>
                <DeleteIcon className="text-red-500" />
              </Button>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                size="small"
                variant="outlined"
                startIcon={<CiEdit />}
                onClick={(e) => {
                  e.stopPropagation();
                  setModelKey({ type: "updateGroup", id: data?._id });
                  dispatch(openModal("updateGroup"));
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<IoAddOutline />}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard(data?._id);
                  setModelKey({ type: "AddModules", id: data?._id });
                  dispatch(openModal("AddModules"));
                }}
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>

      {modelKey && !loader?.isLoading && (
        <Modal
          maxWidth="sm"
          uniqueKey={modelKey?.type}
          closeOnOutsideClick={false}
          title={
            modelKey?.type === "newGroup"
              ? "Create New Group"
              : modelKey?.type == "updateGroup"
              ? "update Group"
              : "Add modules"
          }
          style="rounded-md"
        >
          {modelKey?.type === "newGroup" ? (
            <CreateNewGroup
              userDetails={userDetails}
              onCancelClick={() => dispatch(closeModal(modelKey?.type))}
              saveClicked={saveNewGroup}
            />
          ) : modelKey?.type === "updateGroup" ? (
            <UpdateExistingGroup
              onCancelClick={() => dispatch(closeModal(modelKey?.type))}
              organizationId={user?.organizationId}
              cardInfo={groupData.find((data) => data?._id == modelKey?.id)}
            />
          ) : (
            learningModules && (
              <AddLearningModules
                organizationId={user?.organizationId}
                onCancelClick={() => {
                  setSelectedCard("");
                  dispatch(closeModal(modelKey?.type));
                }}
                cardInfo={groupData.find((data) => data?._id == modelKey?.id)}
                userId={user?.id}
                selectedModule1={selectedModule}
                learningModules1={learningModules}
              />
            )
          )}
        </Modal>
      )}
    </div>
  );
};

export default GroupUserDashboard;
