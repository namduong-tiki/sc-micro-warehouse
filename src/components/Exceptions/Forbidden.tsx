import { Result } from "antd";
import React from "react";

const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Bạn không có quyền truy cập vào trang này"
    />
  );
};

export default Forbidden;
