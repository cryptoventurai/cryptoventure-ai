/* eslint-disable react/prop-types */
// import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";

const LiveScore = ({ score, sentiment }) => {
  // const maxScore = 100; // Max value for the index

  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-center">
      <h2 className="text-xl font-bold">Live Fear and Greed Score</h2>

      {/* Display the score and sentiment */}
      <div className="flex items-center justify-center mt-4">
        <div className="text-6xl font-bold text-yellow-500">{score}</div>
        <div className="ml-4 text-xl">{sentiment}</div>
      </div>

      {/* Speedometer Gauge for Fear and Greed */}
      <div className="mt-8 flex justify-center">
        <ReactSpeedometer
          maxValue={100}
          minValue={0}
          value={score}
          needleColor="gray"
          startColor="red"
          segments={10}
          endColor="green"
          needleTransition="easeQuadIn"
          currentValueText="Current Index: ${value}"
          needleTransitionDuration={2000}
        />
      </div>
    </div>
  );
};

export default LiveScore;
