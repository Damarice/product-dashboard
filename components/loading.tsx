// spinner as the page loads

import React from "react";
import CircleLoader from "react-spinners/CircleLoader";

const Loading: React.FC = () => (
  <div className="flex justify-center items-center h-[400px]">
    <CircleLoader color="#36d7b7" />
  </div>
);

export default Loading;
