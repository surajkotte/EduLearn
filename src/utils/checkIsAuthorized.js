const checkIsAuthorized = (sidbarcomponent, user) => {
  if (user?.userCategory == "Admin" || user?.userCategory == "Student") {
    return true;
  }
};

export default checkIsAuthorized;
