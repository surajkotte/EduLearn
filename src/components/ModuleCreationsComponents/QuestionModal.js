import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createNewQuestion,
  deleteQuestion,
  getAllQuestionsByCategoryId,
  getTestConfig,
} from "../../api/apiData";
import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import Modal from "../../utils/modal";
import { openModal, closeModal } from "../../slice/modalSlice";
import { useDispatch } from "react-redux";
import AddQuestion from "./AddQuestion";

const QuestionModal = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [modalKey, setModalKey] = useState("");
  const dispatch = useDispatch();
  const saveClicked = async (data) => {
    const qoptions = data?.options.map((opt, index) => {
      return {
        option: opt,
        isAnswer: data?.correctAnswerIndex === index ? true : false,
      };
    });
    const responseBody = {
      questionData: [
        {
          question: data?.question,
          options: qoptions,
        },
      ],
    };
    const response = await createNewQuestion(responseBody, categoryId);
    if (response?.questionData) {
      const modifiedData = response?.questionData?.map((item) => ({
        ...item,
      }));
      setQuestions(modifiedData);
      dispatch(closeModal());
    }
  };
  const deleteClicked = async (questionId) => {
    const response = await deleteQuestion(categoryId, questionId);
    if (response?.questionData) {
      const modifiedData = response?.questionData?.filter((item) => {
        return item?._id != questionId;
      });
      setQuestions(modifiedData);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getAllQuestionsByCategoryId(categoryId);
      if (responseData) {
        const modifiedData = responseData?.questionData?.map((item) => ({
          ...item,
        }));
        setQuestions(modifiedData);
      }
    };
    fetchData();
  }, [categoryId]);

  return (
    <div className="p-6 w-[65%] h-screen flex flex-col items-center">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-full mb-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-700 text-center lg:text-left">
          Create Questions
        </h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<IoAddCircleOutline />}
          className="capitalize"
          onClick={() => {
            setModalKey("createNewQuestion");
            dispatch(openModal("createNewQuestion"));
          }}
        >
          Create
        </Button>
      </div>

      {/* Questions List */}
      <div className="flex flex-col gap-6 w-full max-w-6xl">
        {console.log(questions)}
        {questions &&
          questions?.length != 0 &&
          questions?.map((questionInfo, idx) => (
            <div
              key={idx}
              className="rounded-2xl shadow-lg border  hover:shadow-xl transition duration-300 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold ">
                  {idx + 1}. {questionInfo.question}
                </h2>
                <div className="flex gap-3">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      deleteClicked(questionInfo?._id);
                    }}
                  >
                    Delete
                  </Button>
                  <Button variant="outlined">Edit</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questionInfo.options.map((q, optionIdx) => (
                  <div
                    key={q._id}
                    className={`border rounded-xl px-4 py-3 text-gray-800 shadow-sm transition ${
                      q.isAnswer === true ? "bg-green-500 " : "bg-gray-50"
                    }`}
                  >
                    {q.option}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      {modalKey && (
        <Modal maxWidth={"md"} uniqueKey={modalKey} closeOnOutsideClick={true}>
          <AddQuestion onSave={saveClicked} />
        </Modal>
      )}
    </div>
  );
};

export default QuestionModal;
