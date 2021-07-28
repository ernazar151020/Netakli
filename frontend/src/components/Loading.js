import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#2993FC");
  return (
    <Wrap>
      <PacmanLoader color={color} css={override} size={50} />
    </Wrap>
  );
};

export default Loading;
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 130px;
`;
