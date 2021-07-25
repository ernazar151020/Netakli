import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const tokenLocal = localStorage.getItem("token");
    if (tokenString) {
        const userToken = JSON.parse(tokenString);
        return userToken;
    } else {
        const userToken = JSON.parse(tokenLocal);
        return userToken;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
