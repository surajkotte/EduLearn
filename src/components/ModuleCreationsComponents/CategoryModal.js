import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { createNewCategory, getCategoryById } from "../../api/apiData";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../slice/modalSlice";
import AddNewCategory from "./AddNewCategory";
import { useParams } from "react-router-dom";
import Modal from "../../utils/modal";
import { Link } from "react-router-dom";
const CategoryModal = () => {
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [modalKey, setModalKey] = useState("");
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const saveClicked = async (data) => {
    try {
      const responseData = await createNewCategory(data, categoryId);
      if (responseData) {
        const groupedData = responseData?.categoryData?.reduce(
          (acc = {}, item) => {
            const { categoryType, ...rest } = item;
            if (!acc[categoryType]) {
              acc[categoryType] = [];
            }
            acc[categoryType].push(rest);
            return acc;
          },
          {}
        );
        setSelectedCardData(groupedData);
        dispatch(closeModal());
      }
    } catch (err) {}
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategoryById(categoryId);
      if (data) {
        const groupedData = data?.categoryData?.reduce((acc = {}, item) => {
          const { categoryType, ...rest } = item;
          if (!acc[categoryType]) {
            acc[categoryType] = [];
          }
          acc[categoryType].push(rest);
          return acc;
        }, {});
        setSelectedCardData(groupedData);
      }
    };

    fetchData();
  }, [categoryId]);
  return (
    <div className="p-6 h-screen w-[80%]">
      <h1 className="text-3xl font-bold mb-6">Create Categories</h1>
      <div className="flex flex-col gap-4 w-full max-w-3xl">
        <div
          className="h-[84px] w-[192px] border-[1px] bg-gray-800 rounded-2xl shadow-md hover:cursor-pointer transition duration-300 relative hover:scale-105 flex items-center justify-center"
          onClick={() => {
            setModalKey("newCategory");
            dispatch(openModal("newCategory"));
          }}
        >
          <span className="text-white">Create</span>
          <IoAddCircleOutline className="text-white" />
        </div>
        {selectedCardData &&
          Object?.entries(selectedCardData).map(([key, value]) => (
            <div
              className="mb-8 flex flex-col"
              key={`QuestionCrreateNew${key}`}
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
                {key === "Subject" ? "📘" : "📗"} {key}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {value.map((item) => (
                  <Link
                    to={`/questions/createNew/${item._id}`}
                    key={`QuestionsCreateNew${item._id}`}
                  >
                    <div
                      key={item._id}
                      className={`rounded-xl shadow-md hover:shadow-lg p-4 transition duration-300 ${
                        key === "Subject"
                          ? "bg-blue-100"
                          : key === "Topic"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                      } hover:scale-105`}
                    >
                      <h3 className="text-xl font-medium text-gray-700 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Questions: <span className="font-semibold">{2}</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        {modalKey && (
          <Modal
            maxWidth={"md"}
            uniqueKey={modalKey}
            closeOnOutsideClick={true}
          >
            <AddNewCategory onSaveClicked={saveClicked} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CategoryModal;
