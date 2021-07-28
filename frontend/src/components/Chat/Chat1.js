import React, { useState, useEffect } from "react";
import { Button, Input, TextField } from "@material-ui/core";
import SendMessages from "./SendMessages";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import axiosInstance from "../../axiosApi";
import { Link } from "react-router-dom";
import { MdPlaylistAdd } from "react-icons/md";
import ChatForm from "./ChatForm";
import ChatGroups from "./ChatGroups";
import ChatMessage from "./ChatMessage";
const Chat = (props) => {
  const slug = props.match.params.slug;
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState([]);
  const [themeTitle, setThemeTitle] = useState("");
  const [scrollHeight, setScrollHeight] = useState(false);
  const fetchTheme = async () => {
    try {
      await axiosInstance.get(`filter_by_total/${slug}/`).then((data) => {
        console.log(data);
        setTheme(data.data);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  const createTheme = async (event) => {
    event.preventDefault();
    await axiosInstance
      .post("theme/", { title: themeTitle, total_theme: slug })
      .then((data) => {
        console.log(theme);
        setTheme([{ data: data.data, title: themeTitle }, ...theme]);
        setThemeTitle("");
      })

      .catch((err) => {
        console.log(err.response);
      });
  };

  const showForm = () => {
    setShow(!show);
    setScrollHeight(!scrollHeight);
  };

  return (
    <Wrapper>
      <div className="chat_container">
        <div className="chat_content">
          <div className="chat_content_items chat_group_content">
            <div className="chat_group_content_header">
              <h1>Chats</h1>
              <div className="add_btns">
                <button onClick={showForm}>
                  <MdPlaylistAdd className="add_btns_icon" />
                </button>
              </div>
            </div>
            {show && (
              <form className="chat_form" onSubmit={createTheme}>
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                  value={themeTitle}
                  onChange={(e) => setThemeTitle(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                  Создать Групп
                </Button>
              </form>
            )}
            <div
              className="chat_themes"
              style={{ height: `${scrollHeight ? "400px" : "480px"}` }}
            >
              <ul>
                <ChatGroups theme={theme} />
              </ul>
            </div>
          </div>
          <div className="chat_content_items chat_message_content">
            <h1 className="message_content_title">Name of Channell</h1>
            <p className="message_content_subtitle">say hello!</p>

            <div className="message_content">
              <ChatMessage />
              <div className="message_input">
                <ChatForm />
              </div>
            </div>
            <div className="chat_content_items chat_person_content"></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;
const Wrapper = styled.section`

  width: 100%;
  background-color: #fafafa;
  padding: 10px 0 0 0;
  .chat_form{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .chat_container {
    /* max-width: 1500px;
    margin: 0 auto; */
  }
  .chat_content {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
  .chat_content .chat_content_items {
    /* height: calc(100vh - 100px); */
    border-right: 1px solid #0a0a0a;
    /* padding: 15px; */
  }
  .chat_content div:last-child {
    border-right: none;
  }
  .chat_group_content_header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    h1 {
      font-size: 30px;
      text-transform: uppercase;
    }
  }
  .add_btns button {
    background: #198ffe;
    color: #fff;
    padding: 7px 10px;
    outline: none;
    border: none;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
    cursor: pointer;
    .add_btns_icon {
      font-size: 30px;
      color: #fff;
    }
  }
  .chat_form button {
    margin-top: 10px;
  }
  .chat_themes_items {
    list-style: none;
    padding: 12px 15px;
    /* background: #e8f6f0; */
    /* border: 1px solid #49cb8f; */
    text-align: center;
    width: 100%;
    color: #fff;
    .chat_themes_title{
      color:#000;
      font-size: 24px;
      font-weight: 600;
   
    }
    .chat_themes_date span{
      color:#000;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .chat_themes_items  {
    color: #0a0a0a;
       cursor: pointer;
      :hover{
        background: #eee;
      }
  }
  .chat_themes {

    overflow-y: scroll;
    /* z-index: -1; */
    overflow-y: visible;
    overflow-x: hidden;
 ::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #49cb8f; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:  #49ab9f; 
  cursor: pointer;
; 
}
  
}
  }
  .chat_themes ul {
    padding: 0;
    margin-top: 30px;
  }
  .chat_message_content{
position: relative;

.message_input{
  position: absolute;
  bottom: 0;
  width:100%;
 
  }
   .message_form{
     width: 100%;
     display: block;
     .message_form_group{
       width: 100%;
       background: red;
       display: block;
   input{
          width: 100%;
    }
     }
 
}
.message_content{
  height: calc(100vh - 230px);
      overflow-y: scroll;
    /* z-index: -1; */
    overflow-y: visible;
    overflow-x: hidden;
 ::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #49cb8f; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:  #49ab9f; 
  cursor: pointer;
; 
}
}
  }
  .message_content_title{
    color:#2993FC;
    text-align: center;
    font-size: 30px;
    padding: 0;
    margin: 0;
  }
  .message_content_subtitle{
     color:#2993FC;
    text-align: center;
    font-size: 16px;
  }

`;
