import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import axiosInstance from "../../axiosApi";
import Categories from "./Categories";
import Loading from "../Loading";
const Home = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState(null);
  const toChat = (slug) => {
    history.push(`/chat/${slug}`);
  };
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setErrors(null);
      const response = await axiosInstance.get("total-theme/");
      if (response.status > 399) {
        throw new Error("Something went wrong");
      }
      const transformData = response.data.map((item) => {
        console.log(item);
        return {
          slug: item.slug,
          title: item.title,
          date: item.created_at,
          image: item.image,
        };
      });
      setCategory(transformData);
    } catch (error) {
      setErrors(error.message);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let content = <h1>Not Found</h1>;

  if (category.length > 0) {
    content = <Categories category={category} toChat={toChat} />;
  }

  if (loading) {
    content = (
      <h1>
        <Loading />
      </h1>
    );
  }
  if (errors) {
    content = <h1>{errors}</h1>;
  }
  return (
    <Wrapper>
      <div className="container">
        <div className="home_content">
          <h2 className="home_title"> ВЫБЕРИ КАТЕГОРИЮ </h2>
          <div className="home_categories">{content}</div>
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
  }
`;
