import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "../../utils/modal";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../slice/modalSlice";
import { createLearningModule, getAllLearningModles } from "../../api/apiData";
import LearningModal from "./LearningModal";
import { showLoader, hideLoader } from "../../slice/loaderSlice";
const LearningModule = () => {
  const [cardsData, setCardsData] = useState([]);
  const [modalKey, setModalKey] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const nextClicked = () => {};

  const saveClicked = async (learningModalInfo) => {
    if (learningModalInfo?.name) {
      const responseData = await createLearningModule(
        learningModalInfo,
        user?.organizationId
      );
      if (responseData) {
        setCardsData((prev) => [...prev, responseData]);
      }
    }
    dispatch(closeModal());
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoader());
      const response = await getAllLearningModles(
        user?.organizationId,
        user?.id
      );
      if (response?.messageType == "S") {
        setCardsData(response?.data);
      }
      dispatch(hideLoader());
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 h-screen w-full">
      <h1 className="text-3xl font-bold mb-8">Create Dashboards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          onClick={() => {
            setModalKey({ type: "newLearningModal", id: "" });
            dispatch(openModal("newLearningModal"));
          }}
          className="border border-dashed border-gray-400 min-h-[318px] rounded-2xl bg-white shadow-sm flex items-center justify-center flex-col text-gray-600 hover:border-blue-500 hover:text-blue-600 cursor-pointer transition duration-300 hover:shadow-lg"
        >
          <IoAddCircleOutline className="h-12 w-12 mb-2" />
          <p className="text-lg font-medium">Create New Module</p>
        </div>

        {/* Existing Cards */}
        {cardsData?.map((card, idx) => (
          <Link
            to={`/category/createNew/${card?._id}`}
            key={`createCategory-${card?._id}-${idx}`}
          >
            <div
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 relative hover:scale-[1.02] overflow-hidden border border-gray-200 min-h-[318px]"
              onClick={() => {
                setModalKey({ type: "categoryModal", id: card?._id });
                dispatch(openModal("categoryModal"));
              }}
            >
              <img
                src={
                  card.image ||
                  user?.organizationImage ||
                  "https://via.placeholder.com/32"
                }
                alt={card.name}
                className="rounded-t-2xl w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-md">
                <img
                  src={
                    card?.logo ||
                    user?.organizationLogo ||
                    "https://via.placeholder.com/32"
                  }
                  alt={`${card.name} logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {card.name}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {card.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {modalKey && modalKey.type === "newLearningModal" && (
        <Modal
          maxWidth={"md"}
          uniqueKey={modalKey.type}
          closeOnOutsideClick={true}
        >
          <LearningModal saveClicked={saveClicked} nextClicked={nextClicked} />
        </Modal>
      )}
    </div>
  );
};

export default LearningModule;
