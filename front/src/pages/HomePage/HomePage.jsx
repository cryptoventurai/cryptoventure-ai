// import React from 'react'

// import Main from "../../components/Main/Main";
// import Stories from "../../components/Stories/Stories";
import Testing from "../../Testing";
import Slider2 from "../MainSlider/Slider2";
// import LatestNewsFromYt from "../LatestNewsFromYt/LatestNewsFromYt";

const HomePage = () => {
  return (
    <div className="pb-[2rem]">
      <div className="xl:m-auto">
        {/* <Stories /> */}

        {/* <Slider /> */}
        <Slider2 />

        {/* <LatestNewsFromYt /> */}
        <div className="bg-gray-900">
          <div className="xl:w-[80%] xl:m-auto">
            <Testing />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
