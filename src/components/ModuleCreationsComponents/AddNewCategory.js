import React, { useState } from "react";
import { TextField, Checkbox } from "@mui/material";
import { Button } from "@mui/material";
import Select from "react-select";
const AddNewCategory = ({ onSaveClicked }) => {
  const [learningModalInfo, setLearningModalInfo] = useState({
    title: "",
    description: "",
    image: "",
    categoryType: "",
  });
  const options = [
    { value: "Subject", label: "Subject" },
    { value: "Topic", label: "Topic" },
    { value: "Difficulty", label: "Difficulty" },
    { value: "Test", label: "Test" },
  ];
  const onSaveClick = () => {
    onSaveClicked(learningModalInfo);
  };
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Add new category
        </h1>
      </div>
      <TextField
        id="outlined-basic"
        label="Category Name"
        variant="outlined"
        value={learningModalInfo?.name}
        onChange={(e) =>
          setLearningModalInfo((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        required
      />
      <TextField
        id="outlined-basic"
        label="Category Description"
        value={learningModalInfo?.description}
        variant="outlined"
        onChange={(e) =>
          setLearningModalInfo((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
      <Select
        options={options}
        onChange={(e) => {
          setLearningModalInfo((prev) => ({
            ...prev,
            categoryType: e.value,
          }));
        }}
      />
      <div className="flex justify-center w-full gap-3">
        <TextField
          id="outlined-basic"
          label="Upload Image"
          variant="outlined"
          value={learningModalInfo?.image}
          onChange={(e) =>
            setLearningModalInfo((prev) => ({
              ...prev,
              image: e.target.value,
            }))
          }
          sx={{ width: "100%" }}
        />
      </div>
      {learningModalInfo?.categoryType === "Test" && (
        <>
          <div className="flex justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Test Configuration
            </h1>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={learningModalInfo?.isTimeLimitAllowed || false}
                onChange={(e) =>
                  setLearningModalInfo((prev) => ({
                    ...prev,
                    isTimeLimitAllowed: e.target.checked,
                  }))
                }
              />
              <span className="text-gray-700">Enable Time Limit</span>
            </div>
            {learningModalInfo?.isTimeLimitAllowed && (
              <TextField
                type="number"
                label="Time Limit (in minutes)"
                variant="outlined"
                value={learningModalInfo?.timeLimit || ""}
                onChange={(e) =>
                  setLearningModalInfo((prev) => ({
                    ...prev,
                    timeLimit: e.target.value,
                  }))
                }
              />
            )}

            <div className="flex items-center gap-2">
              <Checkbox
                checked={learningModalInfo?.retryPossible || false}
                onChange={(e) =>
                  setLearningModalInfo((prev) => ({
                    ...prev,
                    retryPossible: e.target.checked,
                  }))
                }
              />
              <span className="text-gray-700">Allow Retry</span>
            </div>
            {learningModalInfo?.retryPossible && (
              <TextField
                type="number"
                label="Max Retry Count"
                variant="outlined"
                value={learningModalInfo?.maxRetryCount || ""}
                onChange={(e) =>
                  setLearningModalInfo((prev) => ({
                    ...prev,
                    maxRetryCount: e.target.value,
                  }))
                }
              />
            )}

            <div className="flex items-center gap-2">
              <Checkbox
                checked={learningModalInfo?.allowRetake || false}
                onChange={(e) =>
                  setLearningModalInfo((prev) => ({
                    ...prev,
                    allowRetake: e.target.checked,
                  }))
                }
              />
              <span className="text-gray-700">Allow Retake</span>
            </div>

            <TextField
              multiline
              rows={3}
              label="Instructions"
              variant="outlined"
              value={learningModalInfo?.instructions || ""}
              onChange={(e) =>
                setLearningModalInfo((prev) => ({
                  ...prev,
                  instructions: e.target.value,
                }))
              }
            />
          </div>
        </>
      )}

      <div className="flex w-full gap-3">
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          //onClick={onNextClicked}
        >
          Next
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={onSaveClick}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default AddNewCategory;
