import React from "react";
import styled from "styled-components";
import { AiFillEdit } from "react-icons/ai";
const Profile = () => {
  // const name = user.displayName;
  // const email = user.email;
  return (
    <Wrapper>
      <div className="container">
        <div className="profile_content">
          <div className="profile_content_inner">
            <h1>PROFILE</h1>
            <div className="portfolio_data">
              <label>Имя</label>
              <input type="text" value={""} />
              <label>Email</label>
              <input type="text" value={""} />
              <label>Пароль</label>
              <input type="password" />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
const Wrapper = styled.section`
  padding: 100px 0;
  h1 {
    text-align: center;
  }
  .profile_content {
    box-shadow: -7px 13px 11px 5px rgba(0, 130, 100, 0.41);
    padding: 50px;
  }
  .portfolio_data {
    display: flex;
    flex-direction: column;
    label {
      font-size: 17px;
    }
    input {
      border: none;
      border-bottom: 2px solid #22d172;
      padding: 7px 15px;
    }
  }
`;
