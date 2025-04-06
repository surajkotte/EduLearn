import React, { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategoryById } from "../../api/apiData";
const DashboardCard = () => {
  const { cardId } = useParams();
  const [selectedCardData, setSelectedCardData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategoryById(cardId);
      console.log("Fetched Data: ", data);
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
  }, []);

  //S-subject, T-topic, D-difficulty

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
              {value.map((item) => (
                <Link
                  to={`/questions/${item._id}`}
                  key={`QuestionsLink${item._id}`}
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
      </div>
    </div>
  );
};

export default DashboardCard;
