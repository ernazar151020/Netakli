import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";

const SendMessages = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const socketUrlMessage = `ws://localhost:8000/send_message/${theme_id}/`;

  const SendMessageSocket = new WebSocket(socketUrlMessage);
  SendMessageSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data.theme);
    setTheme([{ id: data.message.id, body: data.message.body, sending: data.message.sending,
                created_at: data.message.created_at, author: data.message.author.username }, ...msg]);
  };
  SendMessageSocket.onclose = (e) => {
    console.error('Chat socket closed unexpectedly');
  };
   const sendMessage = async (e) => {
     e.preventDefault();
     await SendMessageSocket.send(JSON.stringify({
      body: msg,
    }));
     setMsg("");
   };
  return (
    <Wrapper>
      <form onSubmit={sendMessage}>
        <Input
          placeholder="Message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </Wrapper>
  );
};

export default SendMessages;
const Wrapper = styled.div``;
