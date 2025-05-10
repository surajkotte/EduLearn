import React, { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategoryById } from "../../api/apiData";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../slice/loaderSlice";
const DashboardCard = () => {
  const { cardId } = useParams();
  const [selectedCardData, setSelectedCardData] = useState(null);
  const dispatch = useDispatch();
  const calculateProgress = (answered, total) => {
    if (!total || !answered) return 0;
    return Math.min(100, Math.round((answered / total) * 100));
  };
  const getBackgroundColor = (key) => {
    switch (key) {
      case "Subject":
        return "bg-blue-100";
      case "Topic":
        return "bg-green-100";
      case "Difficulty":
        return "bg-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoader());
      const data = await getCategoryById(cardId);
      console.log("Fetched Data: ", data);
      if (data) {
        const groupedData = data?.reduce((acc = {}, item) => {
          const { categoryType, ...rest } = item;
          if (!acc[categoryType]) {
            acc[categoryType] = [];
          }
          acc[categoryType].push(rest);
          return acc;
        }, {});
        setSelectedCardData(groupedData);
      }
      dispatch(hideLoader());
    };

    fetchData();
  }, [cardId]);

  if (!selectedCardData) {
    return <div className="p-6 text-center ">No data found</div>;
  }

  return (
    <div className="p-6 h-screen w-[80%]">
      <h1 className="text-3xl font-bold mb-6">Dashboard Details</h1>
      <div className="flex flex-col gap-4 w-full max-w-3xl">
        {Object.entries(selectedCardData).map(([key, value]) => (
          <div className="mb-8 flex flex-col" key={key}>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center gap-2">
              {key === "Subject" ? "📘" : "📗"} {key}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {value.map((item) => {
                const total = item?.additionalInfo?.numberOfQuestions || 0;
                const answered =
                  item?.additionalInfo?.numberOfQuestionsAnswered || 0;
                const progress = calculateProgress(answered, total);
                return (
                  <Link
                    to={`${
                      item?.categoryConfig?.isTimeLimitAllowed === true
                        ? `/test/${cardId}/${item._id}`
                        : `/questions/${item._id}`
                    }`}
                    key={`QuestionsLink${item._id}`}
                  >
                    {/* <div
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
                      Questions:{" "}
                      <span className="font-semibold">
                        {item?.additionalInfo?.numberOfQuestions}
                      </span>
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          item?.additionalInfo?.numberOfQuestionsAnswered > 0
                            ? "bg-blue-500"
                            : "bg-white"
                        }`}
                        style={{
                          width: `${
                            item?.additionalInfo?.numberOfQuestions == 0 ||
                            item?.additionalInfo?.numberOfQuestionsAnswered == 0
                              ? 0
                              : item?.additionalInfo?.numberOfQuestions ==
                                  item?.additionalInfo
                                    ?.numberOfQuestionsAnswered &&
                                item?.additionalInfo?.numberOfQuestions != 0
                              ? 100
                              : (item?.additionalInfo
                                  ?.numberOfQuestionsAnswered %
                                  item?.additionalInfo?.numberOfQuestions) *
                                10
                          }%`,
                        }}
                      />
                    </div>
                  </div> */}
                    <div
                      className={`rounded-xl shadow hover:shadow-lg transition transform hover:scale-[1.02] duration-300 p-5 ${getBackgroundColor(
                        key
                      )}`}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Questions: <span className="font-bold">{total}</span>
                      </p>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="h-2 bg-indigo-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-right text-gray-600 mt-1">
                        {progress}% completed
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
