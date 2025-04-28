import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllQuestionsByCategoryId, getTestConfig } from "../../api/apiData";
import InstructionsComponent from "./InstructionsComponent";
const TestCompnent = () => {
  const { learningModuleId, categoryId } = useParams();
  const [questions, setQuestions] = useState("");
  const [testConfig, setTestConfig] = useState("");
  const [startTest, setStartTest] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getAllQuestionsByCategoryId(categoryId);
      if (responseData) {
        const modifiedData = responseData?.questionData?.map((item) => {
          return {
            ...item,
            selectedOptionId: item.answerSelected,
            options: item.options.map((option) => ({
              option: option.option,
              _id: option._id,
              isSelected: option.isSelected,
            })),
          };
        });
        setQuestions(modifiedData);
        const testConfigResponse = await getTestConfig(
          learningModuleId,
          categoryId
        );
        if (testConfigResponse?.messageType == "S") {
          setTestConfig(testConfigResponse?.data);
        }
      }
    };
    fetchData();
  }, [categoryId]);
  //   if (!questions || questions?.length == 0) {
  //     return <div>No Questions Available</div>;
  //   }

  return (
    <div className="w-full h-full flex flex-col gap-4 p-6 justify-center items-center">
      {testConfig && !startTest && (
        <InstructionsComponent
          testInfo={testConfig}
          startClicked={() => {
            setStartTest(true);
          }}
        />
      )}
      {startTest && (
        <>
          <span className="text-3xl font-bold mb-6">Test Started</span>
        </>
      )}
    </div>
  );
};

export default TestCompnent;
