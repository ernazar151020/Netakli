import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { CategoryData } from "./data.js";
import { useHistory } from "react-router";
import axiosInstance from "./http-common";
const Home = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const toChat = (slug) => {
    history.push(`/chat/${slug}`);
  };
  const fetchData = () => {
    const response = axiosInstance
      .get("total-theme/")
      .then((data) => {
        setCategory(data.data);
        console.log(data.data.slug);
        // props.setCurrentCategory(data.data.slug);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
    console.log("sdv");
  }, []);
  console.log(category);
  return (
    <Wrapper>
      <div className="container">
        <div className="home_content">
          <h2 className="home_title"> ВЫБЕРИ КАТЕГОРИЮ </h2>
          <div className="home_categories">
            {category.map((item) => {
              props.setCurrentCategory(item.slug);
              return (
                <button
                  className="home_category"
                  key={item.slug}
                  onClick={() => toChat(item.slug)}
                >
                  <img src={item.image} alt="" className="category_img" />
                  <h3 className="home_category_title">{item.title}</h3>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.section`
  height: calc(100vh - 76px);
  overflow-y: scroll;
  .category_img {
    width: 100%;
    height: auto;
  }
  .home_title {
    text-align: center;
    margin-bottom: 2rem;
  }
  padding: 30px 0;
  .home_categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    /* grid-template-columns: repeat(4, 1fr); */
    grid-gap: 50px;
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: 1fr;
    }
    .home_category {
      position: relative;
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
        /* margin-left: -100px; */
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
