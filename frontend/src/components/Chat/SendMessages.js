import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";

const SendMessages = () => {
  const [msg, setMsg] = useState("");
  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   const { uid, photoURL } = auth.currentUser;
  //   await db.collection("messages").add({
  //     text: msg,
  //     photoURL,
  //     uid,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  //   setMsg("");
  // };
  return (
    <Wrapper>
      <form>
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
