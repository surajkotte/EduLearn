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

const root = ReactDOM.createRoot(document.getElementById("root"));
const App = () => {
  return (
    <Sidebar>
      <Loader>
        <Outlet />
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
        path: "/chat",
        element: <LearningModule />,
      },
      {
        path: "/connections",
        element: <Dashboard />,
      },
      { path: "/notifications", element: <LearningModule /> },
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
        path: "/category/createNew/:categoryId",
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
    element: <Dashboard />,
  },
]);
root.render(
  <Provider store={store}>
    <RouterProvider router={routers} />
  </Provider>
);
