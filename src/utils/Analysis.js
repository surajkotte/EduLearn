import React from "react";
import Lottie from "react-lottie";
//import businessAnalysis from "../Misc/business-analysis.json";
const Analysis = ({ file }) => {
  const lottieOptions = {
    animationData: file,
    loop: true,
    autoplay: true,
  };
  return (
    <div className="w-full h-full">
      <Lottie
        // style={{ width: "1024px", height: "900px" }}
        options={lottieOptions}
        //isClickToPauseDisabled={true}
      />
    </div>
  );
};

export default Analysis;
