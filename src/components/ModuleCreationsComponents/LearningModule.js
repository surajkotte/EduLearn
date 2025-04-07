import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "../../utils/modal";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../../slice/modalSlice";
import { createLearningModule, getAllLearningModles } from "../../api/apiData";
import CategoryModal from "./CategoryModal";
import LearningModal from "./LearningModal";
const LearningModule = () => {
  const [cardsData, setCardsData] = useState([]);
  const [modalKey, setModalKey] = useState("");
  const dispatch = useDispatch();
  const nextClicked = () => {};
  const saveClicked = async (learningModalInfo) => {
    console.log(learningModalInfo);
    if (learningModalInfo && learningModalInfo?.name) {
      const responseData = await createLearningModule(learningModalInfo);
      if (responseData) {
        cardsData.push(responseData);
        setCardsData(cardsData);
      }
    } else {
    }
    dispatch(closeModal());
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLearningModles();
      if (data && data.length > 0) {
        setCardsData(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6 ">Create Dashboards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        <div
          className="min-h-[302px] w-[318px] border-[1px] bg-transparent rounded-2xl shadow-md hover:cursor-pointer transition duration-300 relative hover:scale-105 flex items-center justify-center"
          onClick={() => {
            setModalKey({ type: "newLearningModal", id: "" });
            dispatch(openModal("newLearningModal"));
          }}
        >
          Create <IoAddCircleOutline className="h-8 w-8" />
        </div>

        {cardsData &&
          cardsData?.map((card, idx) => (
            <Link
              to={`/category/createNew/${card?._id}`}
              key={`createCatogaries${card?._id}${idx}`}
            >
              <div
                key={card?._id}
                className="bg-gray-300 rounded-2xl shadow-md hover:cursor-pointer transition duration-300 relative hover:scale-105"
                onClick={() => {
                  setModalKey({ type: "categoryModal", id: card?._id });
                  dispatch(openModal("categoryModal"));
                }}
              >
                <img
                  src={card.image || null}
                  alt={card.name}
                  className="rounded-t-2xl w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-md">
                  <img
                    src={card.logo || null}
                    alt={`${card.name} logo`}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {card.name}
                  </h2>
                  <p className="text-gray-500 mb-2">{card.description}</p>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Levels: {card.levels}</span>
                    <span>Status: {card.status}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className={`h-2.5 rounded-full ${
                        card.progress > 0 ? "bg-blue-500" : "bg-gray-400"
                      }`}
                      style={{ width: `${card.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {card.progress}% completed
                  </p>
                </div>
              </div>
            </Link>
          ))}
        {modalKey && (
          <Modal
            maxWidth={"md"}
            uniqueKey={modalKey?.type}
            closeOnOutsideClick={false}
            style=""
          >
            {modalKey?.type === "newLearningModal" && (
              <LearningModal
                saveClicked={saveClicked}
                nextClicked={nextClicked}
              />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default LearningModule;
