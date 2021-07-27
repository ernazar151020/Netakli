import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import SendMessages from "./SendMessages";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import axiosInstance from "../../axiosApi";
import { Link } from "react-router-dom";

const Chat = (props) => {
  const slug = props.match.params.slug;
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [resp, setResponse] = useState(null);
  const [theme, setTheme] = useState([]);
  const [newTheme, setNewTheme] = useState("");

  const fetchTheme = async () => {
    await axiosInstance
      .get(`filter_by_total/${slug}/`)
      .then((data) => {
        setTheme(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  const handleThemeCreate = (event) => {
    event.preventDefault();
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const createTheme = async (event) => {
    event.preventDefault();
    await axiosInstance
      .post("theme/", { title: newTheme, total_theme: slug })
      .then((data) => {
        setTheme(data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Wrapper>
      <div className="chat_content">
        <div className="container-themes">
          <div className="title-themes">
            <h1>{props.categoryText}</h1>
            <Link to="/">
              <IconButton aria-label="back">
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Link>
            <h2 style={{ marginLeft: "18px", marginTop: "10px" }}>Темы</h2>
            <IconButton
              onClick={handleThemeCreate}
              style={{ marginLeft: "178px" }}
              aria-label="add-theme"
            >
              <AddOutlinedIcon />
            </IconButton>
          </div>
          <div className="new_theme">
            {show === true && (
              <form noValidate autoComplete="off" onSubmit={createTheme}>
                <input
                  type="text"
                  placeholder="Ввведите тему разговора"
                  id="theme-create"
                  value={newTheme}
                  onChange={(e) => setNewTheme(e.target.value)}
                />
                <button
                  style={{ marginLeft: "2px", height: "35px" }}
                  type="submit"
                >
                  Создать
                </button>
              </form>
            )}
            <ul className="theme-list">
              {theme.map((item) => {
                const { title, created_at } = item;
                return (
                  <li className="list-item">
                    {title} <p>{created_at}</p>
                  </li>
                );
              })}
              <li className="my-theme">Говнокодер в реале красавчик</li>
            </ul>
          </div>
        </div>
        <div className="container-messages">
          <div className="title">
            <div className="inner-title">
              <img src="#"></img>
              <div className="user"></div>
              <span style={{ color: "#5ed187" }}>online</span>
            </div>
            <h3> Хочу бросить программирование </h3>
          </div>
          <div class="content">
            {/* {messages.map((item) => {
          const { id, text, photoURL } = item;
          return (
            <div key={id}>
              <img src={photoURL} alt="" />
              <p>{text}</p>
              <p>{uid}</p>
            </div>
          );
        })} */}
          </div>
          <SendMessages id="send-message" />
        </div>
        <div className="container-chats">
          <div className="title-chats">
            <h2>Беседа</h2>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Chat;
const Wrapper = styled.section`
  width: 100%;
  background-color: #e8e8e8;
  form {
    display: flex;
    margin: 5px;
  }
  #theme-create {
    width: 100%;
    border-radius: 5.7px;
    border: 0.2px solid #e8e8e8;
    padding: 5px;
    margin-bottom: 5px;
  }
  .chat_content {
    display: flex;
    overflow-y: scroll;
    height: 87vh;
    width: 100%;
  }
  .title-themes {
    display: flex;
    align-items: center;
    text-align: center;
  }
  .title {
    text-align: center;
  }
  .title-chats {
    text-align: center;
  }
  .inner-title {
    text-align: left;
    border-radius: 5px;
    padding: 5px;
    background-color: #fff;
    margin-top: 5px;
    border: 1.4px solid #e8e8e8;
  }
  .new_theme {
    padding: 5px;
    .my-theme {
      background: #a0deb5;
      border-radius: 13px 0px 13px 13px;
    }
  }
  .theme-list {
    padding: 0;
  }

  .new_theme li {
    list-style: none;
    margin: 5px;
    padding: 12px;
    background-color: #fafcfc;
    border-radius: 13px 13px 13px 0px;
    border: 1.4px solid #fff;
  }
  .container-themes {
    height: 800px;
    width: 30%;
    background-color: #e8e8e8;
  }
  .container-messages {
    width: 60%;
    height: 300px;
  }
  .content {
    width: 100%;
    height: 350px;
    overflow-y: scroll;
    margin: 10px;
  }
  .container-chats {
    height: 800px;
    width: 30%;
  }
`;
