import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
const LearningModal = ({ saveClicked, nextClicked }) => {
  const [learningModalInfo, setLearningModalInfo] = useState({
    name: "",
    description: "",
    image: "",
    logo: "",
    progress: "",
  });
  const onSaveClicked = () => {
    saveClicked(learningModalInfo);
  };
  const onNextClicked = () => {};
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create Learning Module
        </h1>
      </div>
      <TextField
        id="outlined-basic"
        label="Module Name"
        variant="outlined"
        value={learningModalInfo?.name}
        onChange={(e) =>
          setLearningModalInfo((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        required
      />
      <TextField
        id="outlined-basic"
        label="Module Description"
        value={learningModalInfo?.description}
        variant="outlined"
        onChange={(e) =>
          setLearningModalInfo((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
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
        <TextField
          id="outlined-basic"
          label="Upload Logo"
          variant="outlined"
          value={learningModalInfo?.logo}
          onChange={(e) =>
            setLearningModalInfo((prev) => ({
              ...prev,
              logo: e.target.value,
            }))
          }
          sx={{ width: "100%" }}
        />
      </div>
      <div className="flex w-full gap-3">
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={onNextClicked}
        >
          Next
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={onSaveClicked}
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default LearningModal;
