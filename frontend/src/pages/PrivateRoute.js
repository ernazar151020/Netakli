import React from "react";
import { Redirect, Route } from "react-router-dom";
import useToken from "../components/useToken";
const PrivateRoute = ({ children, ...rest }) => {
  const { token, setToken } = useToken();

  return (
    <Route
      {...rest}
      render={() => {
        return token ? children : <Redirect to="/signin" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
