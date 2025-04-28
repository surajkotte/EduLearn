import { message } from "antd";
import dotenv from "dotenv";
dotenv.config();

const BACKEND_URL = "http://localhost:4000";
//  learning models related api calls
export const getAllLearningModles = async (organizationId, userId) => {
  try {
    if (!organizationId || !userId) {
      throw new Error("CategoryId is mandatory");
    }
    const response = await fetch(
      `${BACKEND_URL}/learning/getAll/${organizationId}/${userId}`,
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

export const createLearningModule = async (data, organizationId) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/learning/createNew`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, organizationId: organizationId }),
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
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};

export const userSignup = async (data) => {
  if (!data?.emailId || !data?.password) {
    throw new Error("Enter email or password");
  }
  const response = await fetch(`${process.env.BACKEND_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });
  const responseData = await response.json();
  return responseData;
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
          actionRelAuthorization: actionRelAuthorizations,
          displayRelAuthorization: displayRelAuthorizations,
          userId: userId,
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

export const getAllUsers = async (organizationId, userCategory) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/getAllUsers/${userCategory}/${organizationId}`,
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
};

export const getAllUsersByOrg = async (organizationId) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/getAllUsers/${organizationId}`,
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
};

export const createnewGroup = async (data) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/userroute/createGroup`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
      credentials: "include",
    }
  );
  const responseData = await response.json();
  return responseData;
};

export const getGroupes = async (organizationId) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/userroute/getGroupes/${organizationId}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    }
  );
  const responseData = await response.json();
  return responseData;
};

export const updateGroup = async (id, title, description, users) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/userroute/updateGroup/${id}`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, description, users }),
      credentials: "include",
    }
  );
  const responseData = await response.json();
  return responseData;
};

export const UpdateLearningModules = async (
  organizationId,
  GroupId,
  Modules
) => {
  try {
    if (!GroupId || !organizationId || !Modules) {
      throw new Error("Mandatory Info Missing");
    }
    const response = await fetch(
      `${BACKEND_URL}/learning/assignModules/${organizationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learningModules: Modules,
          GroupId: GroupId,
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

export const getAssignedLearningModules = async (GroupId, organizationId) => {
  try {
    if (!GroupId) {
      throw new Error("Mandatory Info Missing");
    }
    const response = await fetch(
      `${BACKEND_URL}/learning/getAssignedModules/${GroupId}/${organizationId}`,
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

export const UpdateUser = async (userId, userInfo) => {
  try {
    const response = await fetch(`${BACKEND_URL}/updateUser/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
      credentials: "include",
    });
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return { messageType: "E", message: err.message };
  }
};
