import { Result } from "antd";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const Empty = () => {
  return (
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </Container>
  );
};

export default Empty;
