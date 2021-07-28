import React from "react";

const ChatGroups = (props) => {
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
          <li key={item.id} className="chat_themes_items">
            <div className="chat_themes_title">{item.title}</div>
            <p className="chat_themes_date">
              <span>{day}</span>
              <span> {month}</span>
            </p>
          </li>
        );
      })}
    </>
  );
};

export default ChatGroups;
