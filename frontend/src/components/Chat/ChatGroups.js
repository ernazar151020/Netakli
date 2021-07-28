import { Button } from "@material-ui/core";
import React, { useState } from "react";
import axiosInstance from "../../axiosApi";
import ChatMessage from "./ChatMessage";

const ChatGroups = (props) => {
  const [themeId, setThemeId] = useState(null);
  return (
    <>
      {props.theme.map((item) => {
        var date = new Date(item.created_at);
        const month = date.toLocaleString("en-US", {
          month: "long",
        });
        const day = date.toLocaleString("en-US", {
          day: "2-digit",
        });
        // const year = item.created_at.getFullYear();
        return (
          <li key={item.id} data-key={item.id} className="chat_themes_items">
            <div data-key={item.id} className="chat_themes_title">{item.title}</div>
            <p data-key={item.id} className="chat_themes_date">
              <span data-key={item.id} >{day}</span>
              <span data-key={item.id} > {month}</span>
            </p>
          </li>
        );
      })}
    </>
  );
};

export default ChatGroups;
