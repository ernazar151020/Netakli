import React, { useState } from "react";
import { css } from "@emotion/react";
import PacmanLoader from "react-spinners/PacmanLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div>
      <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input
        value={color}
        onChange={(input) => setColor(input.target.value)}
        placeholder="Color of the loader"
      />
      <PacmanLoader color={color} loading={loading} css={override} size={150} />
    </div>
  );
};

export default Loading;
