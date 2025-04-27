import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllLearningModles,
  getAssignedLearningModules,
  UpdateLearningModules,
} from "../../api/apiData";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../../slice/toastSlice";
import { hideLoader, showLoader } from "../../slice/loaderSlice";
const AddLearningModules = ({
  organizationId,
  onCancelClick,
  cardInfo,
  userId,
  selectedModule1,
  learningModules1,
}) => {
  const [learningModules, setLearningModules] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [assignedModules, setAssignedModules] = useState("");
  const loader = useSelector((store) => store.loader);
  const dispatch = useDispatch();
  const fetchLearningModules = async () => {
    dispatch(showLoader());
    const response = await getAllLearningModles(organizationId, userId);
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
      cardInfo?._id,
      organizationId
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
  // useEffect(() => {
  //   if (learningModules.length > 0 && cardInfo?._id) {
  //     fetchAssignedModules();
  //   }
  // }, [learningModules, cardInfo]);

  // useEffect(() => {
  //   fetchLearningModules();
  // }, [cardInfo]);
  useEffect(() => {
    console.log(learningModules1);
    setLearningModules(learningModules1);
    setSelectedModule(selectedModule1);
  }, []);

  const handleModuleChange = (selectedOptions) => {
    const updated = selectedOptions?.map((module) => {
      const existing = selectedModule?.find((m) => m?.value === module?.value);
      return (
        existing || {
          ...module,
          permissions: { read: false, write: false },
        }
      );
    });
    setSelectedModule(updated || []);
  };

  const handlePermissionChange = (moduleValue, type) => {
    setSelectedModule((prev) =>
      prev.map((mod) =>
        mod.value === moduleValue
          ? {
              ...mod,
              permissions: {
                ...mod.permissions,
                [type]: !mod.permissions[type],
              },
            }
          : mod
      )
    );
  };

  const handleAddClicked = async (GroupId) => {
    const modifiedMap = selectedModule?.map((data) => {
      return {
        label: data?.label,
        readAccess: data?.permissions?.read,
        writeAccess: data?.permissions?.write,
        moduleId: data?.value,
      };
    });
    console.log(modifiedMap);
    const response = await UpdateLearningModules(
      organizationId,
      GroupId,
      modifiedMap
    );
    if (response?.messageType == "E") {
      dispatch(addToast({ messageType: "E", message: response?.message }));
    } else {
      dispatch(addToast({ messageType: "S", message: "Modules added" }));
    }
  };

  const handleRemoveModule = (value) => {
    setSelectedModule((prev) => prev.filter((mod) => mod.value !== value));
  };

  return (
    learningModules && (
      <div className="space-y-4">
        <Select
          options={learningModules}
          isMulti
          value={selectedModule}
          onChange={handleModuleChange}
          className="z-50"
          placeholder="Select learning modules..."
        />

        <div className="flex flex-wrap gap-4 max-h-60 overflow-y-auto border p-4 rounded bg-gray-50">
          {selectedModule?.length === 0 ? (
            <span className="text-gray-500">No Modules Selected</span>
          ) : (
            selectedModule?.map((mod, index) => (
              <div
                key={mod.value + index}
                className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border rounded bg-white shadow-sm"
              >
                <div className="flex items-center gap-2 text-blue-800 font-medium">
                  <span>{mod.label}</span>
                </div>

                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-1 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={mod.permissions?.read || false}
                      onChange={() => handlePermissionChange(mod.value, "read")}
                    />
                    Read
                  </label>
                  <label className="flex items-center gap-1 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={mod.permissions?.write || false}
                      onChange={() =>
                        handlePermissionChange(mod.value, "write")
                      }
                    />
                    Write
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outlined" onClick={onCancelClick}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddClicked(cardInfo?._id)}
          >
            Add
          </Button>
        </div>
      </div>
    )
  );
};

export default AddLearningModules;
