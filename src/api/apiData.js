import { message } from "antd";
import dotenv from "dotenv";
dotenv.config();

const BACKEND_URL = "http://localhost:4000";
//  learning models related api calls
export const getAllLearningModles = async () => {
  try {
    console.log("Fetching Learning Models..." + BACKEND_URL);
    const response = await fetch(`${BACKEND_URL}/learning/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();
    if (responseData?.messageType == "S") {
      return responseData?.data;
    } else {
      throw new Error(responseData?.message);
    }
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const getCategoryById = async (learningModuleId) => {
  try {
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
    if (responseData?.messageType == "S") {
      return responseData?.data;
    }
  } catch (err) {
    navigate("/login");
  }
};

export const getTestConfig = async (categoryId) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/category/getCategoryTestConfig/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (err) {
    console.error("Error fetching questions:", error);
    return null; // or handle the error as needed
  }
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

export const createLearningModule = async (data) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/learning/createNew`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      }
    );
    const responseData = await response.json();
    return responseData?.data;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const createNewCategory = async (data, learningModuleId) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/category/createNew/${learningModuleId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const createNewQuestion = async (data, categoryId) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/questions/createNew/${categoryId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
        credentials: "include",
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const deleteQuestion = async (categoryId, questionId) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/questions/deleteQuestion/${questionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId: categoryId }),
        credentials: "include",
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const userLogin = async (data) => {
  try {
    if (!data?.emailId || !data?.password) {
      throw new Error("Enter email or password");
    }
    const response = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const responseData = await response.json();
    if (responseData?.messageType == "S") {
      return responseData?.data;
    }
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const userLogout = async () => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const checkIsAuthenticated = async () => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/checkAuth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const deleteAllQuestions = async (categoryId) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/questions/deleteAll`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId: categoryId }),
        credentials: "include",
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const deleteCategory = async (learningModuleId, categoryId) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/category/deleteCategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learningModuleId: learningModuleId,
          categoryId: categoryId,
        }),
        credentials: "include",
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const addAuthorizations = async (
  userId,
  actionRelAuthorizations,
  displayRelAuthorizations
) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/authorization/addAutorization`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learningModuleId: learningModuleId,
          categoryId: categoryId,
        }),
        credentials: "include",
      }
    );
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const getAuthorization = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/authorization/getAutorization/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};
