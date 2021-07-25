// import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { CategoryData } from "./data.js";
import { useHistory } from "react-router";
import axios from "axios";

const Home = (props) => {
const history=useHistory()
  const toChat = (e) => {
    console.log(e.target.children[1].textContent);
    props.setCategoryText(e.currentTarget.children[1].textContent);
    console.log(e.currentTarget.children[1]);
    history.push("/chat");
    axios.get(`http://127.0.0.1:8000/api/v1/theme/by-total-slug/${e.currentTarget.children[1].textContent}`)
      .then((data) => {
        console.log(data);
        localStorage.clear();
          // setResponse(data);
      });
  };
  console.log(CategoryData())
  return (
    <Wrapper>
      <div className="container">
        <div className="home_content">
          <h2 className="home_title"> ВЫБЕРИ КАТЕГОРИЮ </h2>
          <div className="home_categories">
           {/* {CategoryData.map((item, id) => {
              return (
                <button className="home_category" key={id} onClick={toChat}>
                  <span className="category_icon">{item.icon}</span>
                  <h3 className="home_category_title">{item.title}</h3>
                </button>
              );
            })} */}
          </div>
        </div>
      </div>
    </Wrapper>
  )};

export default Home;
const Wrapper = styled.section`
  height: calc(100vh - 76px);
  overflow-y: scroll;
  .home_title {
    text-align: center;
    margin-bottom: 2rem;
  }
  padding: 30px 0;
  .home_categories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: 1fr;
    }
    .home_category {
      padding: 15px;
      background: #f4f6f5;
      box-shadow: 0 1px 3px rgb(0, 0, 0);
      outline: none;
      border: none;
      border-radius: 3px;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      &:hover {
//        background: #551a8b
        img {
          margin-left: 0;
          transform: scale(0.8);
        }
      }
      .home_category_title {
        text-align: center;
      }
      img {
        width: 100%;
        margin-left: -100px;
        transition: all 0.5s ease-in-out;
      }
      .category_icon {
        font-size: 38px;
      }
    }
    .home_category.selected {
      background: coral;
    }
  }
`;
