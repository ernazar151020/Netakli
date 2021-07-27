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
const Chat = (props) => {
  const slug = props.match.params.slug;
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [resp, setResponse] = useState(null);
  const [theme, setTheme] = useState([]);
  const [themeTitle, setThemeTitle] = useState("");
  const fetchTheme = async () => {
    await axiosInstance
      .get(`filter_by_total/${slug}/`)
      .then((data) => {
        setTheme(data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  const createTheme = async (event) => {
    event.preventDefault();
    await axiosInstance
      .post("theme/", { title: themeTitle, total_theme: slug })
      .then((data) => {
        console.log(data);
        setTheme([{ data: data.data, title: themeTitle }, ...theme]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const showForm = () => {
    setShow(!show);
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
            <div className="chat_themes">
              <ul>
                {/* {theme.map((item) => {
                  console.log(item);
                })} */}
                <li></li>
              </ul>
            </div>
          </div>
          <div className="chat_content_items chat_message_content"></div>
          <div className="chat_content_items chat_person_content"></div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;
const Wrapper = styled.section`
  width: 100%;
  background-color: #e8e8e8;
  .chat_container {
    max-width: 1300px;
    margin: 0 auto;
  }
  .chat_content {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
  .chat_content .chat_content_items {
    height: 100vh;
    border-right: 1px solid #0a0a0a;
    padding: 15px;
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
`;
