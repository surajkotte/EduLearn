const checkIsAuthorized = (sidbarcomponent, user) => {
  if (user?.userCategory == "Admin") {
    return true;
  }
};

export default checkIsAuthorized;
