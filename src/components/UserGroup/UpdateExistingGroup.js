import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Select from "react-select";
import {
  getAllLearningModles,
  getAllUsers,
  updateGroup,
} from "../../api/apiData";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { addToast } from "../../slice/toastSlice";
import { message } from "antd";
const UpdateExistingGroup = ({ onCancelClick, organizationId, cardInfo }) => {
  const [groupDetails, setGroupDetails] = useState({
    title: "",
    description: "",
  });

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const dispatch = useDispatch();
  const fetchLearningModules = async () => {
    const response = await getAllLearningModles(organizationId);
    if (response?.messageType === "S") {
      const formattedModules = response.data.map((mod) => ({
        value: mod._id,
        label: mod.name,
      }));
      setLearningModules(formattedModules);
    }
  };
  const updateClicked = async (id) => {
    const users = selectedUsers.map((inf) => inf?.value);
    const response = await updateGroup(
      id,
      groupDetails?.title,
      groupDetails?.description,
      users
    );
    if (response?.messageType == "S") {
      dispatch(
        addToast({ messageType: "S", message: "Group updated successfully" })
      );
    } else {
      dispatch(
        addToast({ messageType: "E", message: "Unable to update group" })
      );
    }
  };
  const fetchUsers = async (id, userType) => {
    const response = await getAllUsers(id, userType);
    if (response?.messageType == "S") {
      const users = response?.data.map((userInfo) => ({
        label: `${userInfo?.firstName} ${userInfo?.lastName}`,
        value: userInfo?._id,
      }));
      setUserDetails(users);
    }
  };
  useEffect(() => {
    if (cardInfo) {
      console.log(cardInfo);
      setGroupDetails({
        title: cardInfo?.title,
        description: cardInfo?.description,
      });
      const usersInfo = cardInfo?.users?.map((info) => {
        return {
          label: info?.userId.firstName + " " + info?.userId?.lastName,
          value: info?.userId._id,
        };
      });
      setSelectedUsers(usersInfo);
    }
    // fetchLearningModules();
  }, [organizationId]);
  useEffect(() => {
    fetchUsers(organizationId, cardInfo?.userType);
  }, []);
  return (
    <div className="flex flex-col gap-5 p-4 bg-white rounded-lg shadow-md max-w-xl">
      <TextField
        label="Group Name"
        variant="outlined"
        fullWidth
        required
        value={groupDetails.title}
        onChange={(e) =>
          setGroupDetails((prev) => ({ ...prev, title: e.target.value }))
        }
      />

      <TextField
        label="Group Description"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={groupDetails.description}
        onChange={(e) =>
          setGroupDetails((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      <div>
        <label className="block mb-1 text-sm font-medium">Select Users</label>
        <Select
          options={userDetails}
          isMulti
          value={selectedUsers}
          onChange={setSelectedUsers}
          className="z-50"
          placeholder="Choose users..."
        />
        <div className="flex flex-wrap gap-2 mt-2 max-h-40 overflow-y-auto border p-3 rounded bg-gray-50">
          {selectedUsers?.length === 0 ? (
            <span className="text-gray-500">No users selected</span>
          ) : (
            selectedUsers.map((user, index) => (
              <div
                key={user.value + index}
                className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 border rounded shadow-sm text-sm"
              >
                <span>{user.label}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() =>
                    setSelectedUsers((prev) =>
                      prev.filter((u) => u.value !== user.value)
                    )
                  }
                >
                  <RxCrossCircled />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outlined" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateClicked(cardInfo?._id)}
        >
          Update Group
        </Button>
      </div>
    </div>
  );
};

export default UpdateExistingGroup;
