import { Spin } from "antd";
import React from "react";

function Loader() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}

export default Loader;
