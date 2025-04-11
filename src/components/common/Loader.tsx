import { Spin } from "antd";

function Loader() {
  return (
    <div className="h-full flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}

export default Loader;
