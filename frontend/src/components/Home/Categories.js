import React from "react";
import styled from "styled-components";
const Categories = (props) => {
  return (
    <>
      {props.category.map((item) => {
        return (
          <button
            className="home_category"
            key={item.slug}
            onClick={() => props.toChat(item.slug)}
          >
            <img src={item.image} alt="" className="category_img" />
            <h3 className="home_category_title">{item.title}</h3>
          </button>
        );
      })}
    </>
  );
};

export default Categories;
const Wrap = styled.div`
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
`;
