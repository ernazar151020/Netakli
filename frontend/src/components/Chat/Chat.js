import React from "react";
import styled from "styled-components";
// import { useAuthState } from "react-firebase-hooks";
import { auth } from "../../firebase";
import { Redirect } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { useAuthState } from "react-firebase-hooks/auth";
const Chat = () => {
  const [user] = useAuthState(auth);
  if (!user) {
    return <Redirect to="/signin" />;
  }
  return (
    <Wrapper>
      <div className="container">
        <div className="chat_content">
          chat
          <ChatEngine
            projectID="487eb458-db4a-4a25-b8f3-2a6754aa3871"
            userName="Ernazar"
            userSecret="4488"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;
const Wrapper = styled.section`
  height: calc(100vh - 100px);
  overflow-y: scroll;
`;
