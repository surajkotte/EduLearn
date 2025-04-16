import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./src/components/Sidebar";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./src/components/Dashboard";
import DashboardCard from "./src/components/DashboardComponents/DashboardCard";
import QuestionsCompnent from "./src/components/DashboardComponents/QuestionsCompnent";
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import Loader from "./src/utils/Loader";
import LearningModule from "./src/components/ModuleCreationsComponents/LearningModule";
import CategoryModal from "./src/components/ModuleCreationsComponents/CategoryModal";
import QuestionModal from "./src/components/ModuleCreationsComponents/QuestionModal";
import Login from "./src/components/Login";
import AuthenticatedRoute from "./src/utils/AuthenticatedRoute";
import ProtectedRoute from "./src/utils/ProtectedRoute";
import Toast from "./src/utils/Toast";
import "./src/index.css";
import Signup from "./src/components/signup";
import Assignmodule from "./src/components/AssignModules/Assignmodule";
import GroupUserDahboard from "./src/components/UserGroup/GroupUserDahboard";
const root = ReactDOM.createRoot(document.getElementById("root"));
const App = () => {
  return (
    <Sidebar>
      <Loader>
        <AuthenticatedRoute>
          <Outlet />
        </AuthenticatedRoute>
      </Loader>
    </Sidebar>
  );
};
const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/assignModules",
        element: <Assignmodule />,
      },
      {
        path: "/groupusers",
        element: <GroupUserDahboard />,
      },
      {
        path: "/connections",
        element: <Dashboard />,
      },
      { path: "/createnewmodules", element: <LearningModule /> },
      { path: "/profile", element: <Dashboard /> },
      { path: "/cards/:cardId", element: <DashboardCard /> },
      {
        path: "/cards/:cardId/section/:sectionId/:itemId",
        element: <QuestionsCompnent />,
      },
      {
        path: "/questions/:categoryId",
        element: <QuestionsCompnent />,
      },
      {
        path: "/category/createNew/:learningModuleId",
        element: <CategoryModal />,
      },
      {
        path: "/questions/createNew/:categoryId",
        element: <QuestionModal />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
root.render(
  <Provider store={store}>
    <Toast>
      <RouterProvider router={routers} />
    </Toast>
  </Provider>
);
