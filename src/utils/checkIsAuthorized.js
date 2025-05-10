import { useSelector } from "react-redux";

const checkIsAuthorized = (sidebarcomponent, user) => {
  const authorization = useSelector((store) => store.auth);
  const userRoutes = [
    {
      auth: "displayLearningModule",
      link: "/dashboard",
    },
    {
      auth: "displayAssignModules",
      link: "/assignModules",
    },
    {
      auth: "displayGroupUsers",
      link: "/groupUsers",
    },
    {
      auth: "displayCreateNewModule",
      link: "/createNewModules",
    },
  ];
  if (user?.userCategory == "Admin") {
    return true;
  }
  const route = userRoutes.find(
    (route) => route.link === sidebarcomponent?.link
  );
  return route && authorization?.displayAuthorization?.[route.auth] === true;
};

export default checkIsAuthorized;
