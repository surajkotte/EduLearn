import { useEffect, useState } from "react";

const AuthorizationEditor = ({
  initialAuthorizations,
  modifyAuthorizations,
}) => {
  const [authData, setAuthData] = useState("");
  //const [toggleClicked, setToggleClicked] = useState(false);

  const handleToggle = (section, field) => {
    // setAuthData((prev) => ({
    //   ...prev,
    //   [section]: {
    //     ...prev[section],
    //     [field]: !prev[section][field],
    //   },
    // }));
    const updatedValue = {
      ...initialAuthorizations,
      [section]: {
        ...initialAuthorizations[section],
        [field]: !initialAuthorizations[section][field],
      },
    };
    modifyAuthorizations(updatedValue);
  };

  useEffect(() => {
    setAuthData(initialAuthorizations);
  }, [initialAuthorizations]);
  return (
    <div className="w-full mx-auto p-6 rounded-2xl shadow-lg space-y-8">
      <h1 className="text-2xl font-bold text-center text-black">
        Authorization Settings
      </h1>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Action Authorization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {authData &&
            Object.entries(authData.actionAuthorization).map(
              ([key, value]) =>
                key != "_id" &&
                key != "createdAt" &&
                key != "updatedAt" && (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm"
                  >
                    <span className="capitalize text-black">{key}</span>
                    <button
                      onClick={() => handleToggle("actionAuthorization", key)}
                      className={`px-4 py-2 rounded-full text-black ${
                        value == true ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {value == true ? "Allowed" : "Not Allowed"}
                    </button>
                  </div>
                )
            )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Display Authorization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {authData &&
            Object.entries(authData.displayAuthorization).map(
              ([key, value]) =>
                key != "_id" && (
                  <div
                    key={key}
                    className="flex items-center justify-between  p-4 rounded-xl shadow-sm"
                  >
                    <span className="capitalize text-black">{key}</span>
                    <button
                      onClick={() => handleToggle("displayAuthorization", key)}
                      className={`px-4 py-2 rounded-full text-black ${
                        value == true ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {value == true ? "Allowed" : "Not Allowed"}
                    </button>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default AuthorizationEditor;
