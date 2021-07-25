import React, { useState } from "react";
import styled from "styled-components";
// import { emailjs } from "emailjs-com";
// import { init } from "emailjs-com";
// init("user_20RaVY9XHJqnQPy2oSKUx");
const Questions = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [confetti, setConfetti] = useState(false);
  // FUNCTION
  const sendEmail = (e) => {
    e.preventDefault();
    setConfetti(false);
    if (name && email) {
      // emailjs
      //   .sendForm(
      //     "service_bx6njmp",
      //     "template_oxte81c",
      //     e.target,
      //     "user_20RaVY9XHJqnQPy2oSKUx"
      //   )
      //   .then(
      //     (result) => {
      //       console.log(result.text);
      //     },
      //     (error) => {
      //       console.log(error.text);
      //     }
      //   );
      // setName("");
      // setEmail("");
      // setArea("");
      // setConfetti(true);
    }
  };
  // FUNCTION
  return (
    <Wrapper>
      <div className="container">
        <div className="question_content">
          <form id="contact-form" onSubmit={sendEmail}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                rows="5"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Questions;
const Wrapper = styled.section`
  padding: 20px 0;
  .question_content {
    height: calc(100vh - 100px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .form-group {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 20px 0;
  }
  #contact-form {
    width: 500px;
    background: #38015c;
    padding: 20px 50px;
    border-radius: 10px;
    @media (max-width: 768px) {
      padding: 20px;
      width: 100%;
    }
  }
  .form-control {
    width: 100%;
    padding: 7px 20px;
    border-radius: 5px;
    outline: none;
    font-weight: 500;
  }
  label {
    color: #fff;
    font-weight: 800;
    font-size: 18px;
  }
  .btn-primary {
    background: #9f5ccc;
    border-radius: 5px;
    padding: 7px 20px;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
  }
`;
