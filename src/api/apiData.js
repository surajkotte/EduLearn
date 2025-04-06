import dotenv from "dotenv";
dotenv.config();

const BACKEND_URL = "http://localhost:4000";
//  learning models related api calls
export const getAllLearningModles = async () => {
  console.log("Fetching Learning Models..." + BACKEND_URL);
  const response = await fetch(`${BACKEND_URL}/learning/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  return responseData?.data;
};

export const getCategoryById = async (learningModuleId) => {
  const response = await fetch(
    `${BACKEND_URL}/category/getCategoryById/${learningModuleId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();
  return responseData?.data;
};

export const getAllQuestionsByCategoryId = async (categoryId) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/questions/getAllQuestions/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    return responseData?.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return null; // or handle the error as needed
  }
};

export const updateQuestionData = async (categoryId, data) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/questions/update/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedQuestionData: data }),
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("Error updating question data:", error);
    return null;
  }
};
