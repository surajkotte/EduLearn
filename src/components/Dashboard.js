import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllLearningModles } from "../api/apiData";
import { showLoader, hideLoader } from "../slice/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [cardsData, setCardsData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoader());
      try {
        const data = await getAllLearningModles(user?.organizationId);
        if (data?.messageType == "E") {
          throw new Error("Invalid token");
        }
        if (data && data.length > 0) {
          setCardsData(data);
        }
      } catch (err) {
        navigate("/login");
      } finally {
        dispatch(hideLoader());
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-6 h-screen w-[80%]">
      <h1 className="text-3xl font-bold mb-6 ">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {cardsData && cardsData?.length != 0 ? (
          cardsData.map((card, idx) => (
            <Link to={`/cards/${card?._id}`} key={card?._id}>
              {" "}
              <div
                key={idx}
                className="bg-gray-300 rounded-2xl shadow-md hover:cursor-pointer transition duration-300 relative hover:scale-105 min-h-[318px]"
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
          ))
        ) : (
          // <div className=" flex justify-center items-center">
          //   No Modules Found
          // </div>
          <></>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
