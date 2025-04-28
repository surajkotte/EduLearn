import { Button } from "@mui/material";
import React from "react";

const InstructionsComponent = ({ testConfig, startClicked }) => {
  const instructionsHTML = `
    <h1>🖥️ Online Test Instructions</h1>

    <h2>General Guidelines:</h2>
    <ul>
      <li>Use only the <strong>mouse</strong> to navigate; avoid using the keyboard unless instructed.</li>
      <li>The test will start automatically at the scheduled time.</li>
    </ul>

    <h2>Test Structure:</h2>
    <ul>
      <li><strong>Total Duration:</strong> ${testConfig?.timeLimit} Minutes</li>
      <li><strong>Subjects:</strong> Physics, Chemistry, Mathematics</li>
      <li><strong>Total Questions:</strong> 90 Questions (30 per subject)</li>
      <li><strong>Sections:</strong> MCQs and Numerical Type Questions</li>
    </ul>

    <h2>Marking Scheme:</h2>
    <ul>
      <li><strong>MCQs:</strong> +4 for correct, -1 for incorrect.</li>
      <li><strong>Numerical Type:</strong> +4 for correct, No negative marking.</li>
    </ul>

    <h2>Navigation Instructions:</h2>
    <ul>
      <li>Use "Next" and "Previous" buttons to navigate between questions.</li>
      <li>You can mark questions for review and return to them later.</li>
      <li>The test will auto-submit when time ends.</li>
    </ul>

    <h2 class="important">Important:</h2>
    <ul>
      <li>Do not refresh or close your browser during the test.</li>
      <li>Academic dishonesty will result in disqualification.</li>
    </ul>

    <p><strong>✅ When ready, click "Start Test".</strong></p>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: instructionsHTML }} />
      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={startClicked}
      >
        Start Test
      </Button>
    </>
  );
};

export default InstructionsComponent;
