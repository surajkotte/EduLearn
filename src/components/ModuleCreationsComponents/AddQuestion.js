import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";

const AddQuestion = ({ onSave }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSave = () => {
    if (!question.trim()) return alert("Question cannot be empty.");
    if (options.some((opt) => !opt.trim()))
      return alert("All options must be filled.");
    if (correctIndex === null)
      return alert("Please select the correct answer.");

    const payload = {
      question,
      options,
      correctAnswerIndex: correctIndex,
    };
    onSave(payload);
    resetForm();
  };

  const resetForm = () => {
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(null);
  };

  return (
    <div className="mx-auto p-6 rounded-xl flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-blue-700 text-center">
        Add Question
      </h2>

      <TextField
        fullWidth
        label="Question"
        multiline
        rows={1}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="flex flex-col gap-4">
        <RadioGroup
          value={correctIndex}
          onChange={(e) => setCorrectIndex(Number(e.target.value))}
        >
          {options.map((opt, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border p-3 rounded-lg shadow-sm"
            >
              <FormControlLabel value={index} control={<Radio />} label="" />
              <TextField
                fullWidth
                label={`Option ${index + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="text" onClick={resetForm}>
          Reset
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddQuestion;
