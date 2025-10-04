import React from "react";

type Props = {
  road: number;
};

const TrafficLight: React.FC<Props> = ({ road }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className={`w-12 h-12 rounded-full bg-red-500 ${
          road === 1 ? "opacity-100" : "opacity-30"
        }`}
      ></div>
      <div
        className={`w-12 h-12 rounded-full bg-yellow-500 ${
          road === 2 ? "opacity-100" : "opacity-30"
        }`}
      ></div>
      <div
        className={`w-12 h-12 rounded-full bg-green-500 ${
          road === 3 ? "opacity-100" : "opacity-30"
        }`}
      ></div>
    </div>
  );
};

export default TrafficLight;
