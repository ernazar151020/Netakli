import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHome } from "react-icons/ai";
import Tooltip from "@material-ui/core/Tooltip";
import {
  BsChatSquareDots,
  BsSearch,
  BsQuestionSquareFill,
} from "react-icons/bs";
import { RiContactsLine } from "react-icons/ri";
import { Button } from "@material-ui/core";
import useToken from "../components/useToken";
// import SignIn from "../components/SignIn";

const FooterNavbar = (props) => {
  const { token, setToken } = useToken();

  const logOut = (e) => {
    e.preventDefault();
    return fetch("http://localhost:8000/api/v1/accounts/dj-rest-auth/logout/", {
      method: "POST",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => sessionStorage.clear())
      .then(() => localStorage.clear())
      .then(() => window.location.replace("/signin"));
  };

  return (
    <FooterHeader>
      <div className="container">
        <div className="footer_nav_content">
          <Tooltip title="CHAT">
            <NavLink to="/chat" activeClassName={"active_button"} exact>
              <BsChatSquareDots className="footer_navbar_icons" />
            </NavLink>
          </Tooltip>
          <Tooltip title="SEARCH">
            <NavLink to="/search" activeClassName={"active_button"} exact>
              <BsSearch className="footer_navbar_icons" />
            </NavLink>
          </Tooltip>
          <Tooltip title="PROFILE">
            <NavLink to="/profile" activeClassName={"active_button"} exact>
              <RiContactsLine className="footer_navbar_icons" />
            </NavLink>
          </Tooltip>
          <Tooltip title="QUESTIONS">
            <NavLink to="/questions" activeClassName={"active_button"} exact>
              <BsQuestionSquareFill className="footer_navbar_icons" />
            </NavLink>
          </Tooltip>
          {token && (
            <Button variant="contained" color="primary" onClick={logOut}>
              Log out
            </Button>
          )}
        </div>
      </div>
    </FooterHeader>
  );
};

export default FooterNavbar;
const FooterHeader = styled.nav`
  position: absolute;
  padding: 20px 0;
  bottom: 0;
  box-shadow: 0 9px 14px rgb(0, 0, 0);
  width: 100%;
  .footer_nav_content {
    display: flex;
    justify-content: space-around;
    .footer_navbar_icons {
      font-size: 25px;
    }
  }
`;
