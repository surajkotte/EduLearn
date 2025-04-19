import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Select from "react-select";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
const CreateNewGroup = ({ userDetails, onCancelClick, saveClicked }) => {
  const [groupdetails, setGroupdetails] = useState({
    title: "",
    description: "",
    organizationId: "",
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleSaveClick = () => {
    saveClicked(selectedUsers, groupdetails);
  };
  return (
    <div className="flex flex-col gap-4">
      <TextField
        label="Group Name"
        variant="outlined"
        fullWidth
        required
        value={groupdetails.title}
        onChange={(e) =>
          setGroupdetails((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <TextField
        label="Group Description"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={groupdetails.description}
        onChange={(e) =>
          setGroupdetails((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />

      <Select
        options={userDetails}
        isMulti
        value={selectedUsers}
        onChange={setSelectedUsers}
        className="z-50"
        placeholder="Select users..."
      />
      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto border p-3 rounded bg-gray-50">
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
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outlined" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          Save Group
        </Button>
      </div>
    </div>
  );
};

export default CreateNewGroup;
