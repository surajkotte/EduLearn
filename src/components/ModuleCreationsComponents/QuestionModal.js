import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createNewQuestion,
  deleteQuestion,
  getAllQuestionsByCategoryId,
  deleteAllQuestions,
  getTestConfig,
} from "../../api/apiData";
import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import Modal from "../../utils/modal";
import { openModal, closeModal } from "../../slice/modalSlice";
import { useDispatch } from "react-redux";
import AddQuestion from "./AddQuestion";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { showLoader, hideLoader } from "../../slice/loaderSlice";
import { addToast } from "../../slice/toastSlice";

const QuestionModal = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [modalKey, setModalKey] = useState("");
  const dispatch = useDispatch();
  const saveClicked = async (data) => {
    dispatch(showLoader());
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
    if (response?.messageType == "S") {
      const modifiedData = response?.data?.questionData?.map((item) => ({
        ...item,
      }));
      setQuestions(modifiedData);
      dispatch(
        addToast({ messageType: "S", message: "Question created successfully" })
      );
      dispatch(closeModal());
    } else {
      dispatch(addToast({ messageType: "E", message: response?.message }));
    }
    dispatch(hideLoader());
  };
  const deleteQuestions = async () => {
    dispatch(showLoader());
    const response = await deleteAllQuestions(categoryId);
    if (response?.messageType == "S") {
      setQuestions("");
      dispatch(
        addToast({
          messageType: "S",
          message: "Questions Deleted Successfully",
        })
      );
    } else {
      dispatch(addToast({ messageType: "E", message: response?.message }));
    }
    dispatch(hideLoader());
  };
  const deleteClicked = async (questionId) => {
    dispatch(showLoader());
    const response = await deleteQuestion(categoryId, questionId);
    if (response?.messageType == "S") {
      const modifiedData = response?.data?.questionData?.filter((item) => {
        return item?._id != questionId;
      });
      dispatch(
        addToast({ messageType: "S", message: "Question deleted successfully" })
      );
      setQuestions(modifiedData);
    } else {
      dispatch(addToast({ messageType: "E", message: response?.message }));
    }
    dispatch(hideLoader());
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoader());
      const responseData = await getAllQuestionsByCategoryId(categoryId);
      if (responseData) {
        const modifiedData = responseData?.questionData?.map((item) => ({
          ...item,
        }));
        setQuestions(modifiedData);
      }
      dispatch(hideLoader());
    };
    fetchData();
  }, [categoryId]);

  return (
    <div className="p-6 w-[65%] h-screen flex flex-col items-center">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-full mb-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-700 text-center lg:text-left">
          Create Questions
        </h1>
        <div className="flex gap-2">
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            className="capitalize"
            onClick={() => {
              deleteQuestions();
            }}
          >
            Delete All
          </Button>
        </div>
      </div>

      {/* Questions List */}
      <div className="flex flex-col gap-6 w-full max-w-6xl">
        {console.log(questions)}
        {questions && questions?.length != 0 ? (
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
                  {/* <Button
                    variant="outlined"
                    onClick={() => {
                      deleteClicked(questionInfo?._id);
                    }}
                  >
                    <MdDelete />
                  </Button> */}
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      deleteClicked(questionInfo?._id);
                    }}
                  >
                    <DeleteIcon fontSize="inherit" color="primary" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small">
                    <EditIcon fontSize="inherit" color="primary" />
                  </IconButton>
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
          ))
        ) : (
          <div className="flex w-full h-full justify-center items-center">
            No Questions found
          </div>
        )}
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
