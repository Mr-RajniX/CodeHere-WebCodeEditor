import React from "react";
import { FallingLines ,RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <FallingLines
  color="#4fa94d"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />
  );
};

export default Spinner;
