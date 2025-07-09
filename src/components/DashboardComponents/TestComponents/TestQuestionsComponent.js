import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
const TestQuestionsComponent = ({
  questions,
  startTest,
  testConfigResponse,
}) => {
  //const [startTest, setStartTest] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const getTimerColor = () => {
    if (secondsLeft <= 60) return "text-red-500";
    if (secondsLeft <= 300) return "text-orange-500";
    return "text-emerald-600";
  };
  const getOptionStyles = (q, questionInfo) => {
    if (q._id === questionInfo?.answerSelected && questionInfo?.isCorrect) {
      return "bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400 text-white shadow-lg transform scale-[1.02]";
    }
    if (q._id === questionInfo?.answerSelected && !questionInfo?.isCorrect) {
      return "bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white shadow-lg transform scale-[1.02]";
    }
    if (q._id === questionInfo?.selectedOptionId) {
      return "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400 text-white shadow-lg transform scale-[1.02]";
    }
    return "bg-white border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:shadow-md hover:transform hover:scale-[1.01]";
  };
  useEffect(() => {
    if (startTest) {
      setSecondsLeft((testConfigResponse?.timeLimit || 0) * 60);
      setIsRunning(true);
    }
  }, []);

  useEffect(() => {
    let intervalId;

    if (startTest && isRunning && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => {
          if (prevSeconds <= 1) {
            setIsRunning(false);
            console.log("Timer expired!");
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, secondsLeft]);
  return (
    <div className="w-full min-h-screen">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h1 className="text-2xl font-bold text-gray-800">
                Test in Progress
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span
                  className={`text-lg font-mono font-bold ${getTimerColor()}`}
                >
                  {formatTime(secondsLeft)}
                </span>
              </div>
              <div className="hidden sm:block text-sm text-gray-500">
                remaining
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {questions?.length > 0 ? (
          <div className="space-y-8">
            {questions.map((questionInfo, idx) => (
              <div
                key={questionInfo._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.01]"
              >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                        {questionInfo.question}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questionInfo.options.map((q, optionIdx) => (
                      <button
                        key={q._id}
                        className={`group relative text-left border-2 rounded-xl p-4 transition-all duration-300 ${getOptionStyles(
                          q,
                          questionInfo
                        )}`}
                        disabled={questionInfo?.answerSelected ? true : false}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {String.fromCharCode(65 + optionIdx)}
                            </span>
                          </div>
                          <span className="text-sm font-medium leading-relaxed">
                            {q.option}
                          </span>
                        </div>

                        {(q._id === questionInfo?.selectedOptionId ||
                          q._id === questionInfo?.answerSelected) && (
                          <div className="absolute top-3 right-3">
                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center pt-8">
              <Button
                size="large"
                className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white font-semibold px-12 py-3 rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300"
                style={{
                  height: "auto",
                  fontSize: "20px",
                }}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Submit Test</span>
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Questions Available
            </h3>
            <p className="text-gray-500">
              Please contact your instructor for assistance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestQuestionsComponent;
