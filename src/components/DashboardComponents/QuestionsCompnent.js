import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAllQuestionsByCategoryId,
  updateQuestionData,
} from "../../api/apiData";
import { AiFillOpenAI } from "react-icons/ai";
import { GoogleGenAI } from "@google/genai";
import Modal from "../../utils/modal";
import { useDispatch } from "react-redux";
import { openModal } from "../../slice/modalSlice";
import { hideLoader, showLoader } from "../../slice/loaderSlice";
import { Button } from "@mui/material";
const QuestionsCompnent = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [aiPromptClicked, setAiPromptClicked] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getAllQuestionsByCategoryId(categoryId);
      // console.log(responseData);
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
      }
    };
    fetchData();
  }, [categoryId]);

  const handleSubmitCliked = async () => {
    try {
      dispatch(showLoader());
      const response = await updateQuestionData(categoryId, questions);
      console.log(response);
      const updatedData = await response?.data?.questionData?.map((item) => {
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
      console.log(updatedData);
      setQuestions(updatedData);
      setAiPromptClicked(null);
    } catch (error) {
      console.log("Error submitting questions:", error);
    } finally {
      dispatch(hideLoader());
    }
  };

  const callOpenAi = async (question, id) => {
    dispatch(showLoader());
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Explain in detail, ${question}`,
    });
    setAiPromptClicked({
      question: question,
      answer: response?.text,
      questionId: id,
    });
    dispatch(openModal(id));
    dispatch(hideLoader());
  };
  if (!questions || questions?.length == 0) {
    return <div>No Questions Available</div>;
  }
  return (
    <div className="p-6 h-screen flex flex-col items-center w-[80%]">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Questions
      </h1>

      <div className="flex flex-col gap-6 w-full lg:max-w-[65%] xl:max-w-[65%] md:max-w-[85%] sm:max-w-[90%]">
        {questions.map((questionInfo, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl shadow-md border-[1px] hover:shadow-lg transition duration-300"
          >
            <div className="w-full flex">
              <h2 className="text-lg font-semibold mb-4 w-full">
                {idx + 1}. {questionInfo.question}
              </h2>
              <button
                onClick={() =>
                  callOpenAi(questionInfo.question, questionInfo._id)
                }
                className="text-blue-400 hover:text-blue-500 transition duration-300 text-xl"
                disabled={questionInfo?.answerSelected ? false : true}
              >
                <AiFillOpenAI />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {questionInfo.options.map((q, optionIdx) => (
                <button
                  key={q._id}
                  className={`text-left border rounded-lg p-3 shadow-md transition duration-300 ${
                    q._id === questionInfo?.answerSelected &&
                    questionInfo?.isCorrect
                      ? "bg-green-600 border-green-500 text-white"
                      : q._id === questionInfo?.answerSelected &&
                        !questionInfo?.isCorrect
                      ? "bg-red-600 border-red-500 text-white"
                      : q._id === questionInfo?.selectedOptionId
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-green-700"
                  }`}
                  onClick={() => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[idx].selectedOptionId = q._id;
                    setQuestions(updatedQuestions);
                  }}
                  disabled={questionInfo?.answerSelected ? true : false}
                >
                  <label
                    htmlFor={`q${idx}-opt${optionIdx}`}
                    className="text-gray-100 cursor-pointer"
                  >
                    {q.option}
                  </label>
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end mb-2">
          <Button
            color="primary"
            size="small"
            variant="contained"
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => {
              handleSubmitCliked();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
      {aiPromptClicked && (
        <Modal
          maxWidth={"md"}
          uniqueKey={aiPromptClicked.questionId}
          closeOnOutsideClick={true}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Question: {aiPromptClicked.question}
            </h2>
            {/* <p className="text-gray-700 mb-4">
              Answer: {aiPromptClicked.answer}
            </p> */}
            <span
              dangerouslySetInnerHTML={{ __html: aiPromptClicked.answer }}
            ></span>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default QuestionsCompnent;
