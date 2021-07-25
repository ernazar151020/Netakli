import { useState } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  const switchAuthModeHandler = () => {
    props.setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{props.isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="text">Your Name</label>
          <input
            type="text"
            id="text"
            required
            value={name}
            onChange={handleName}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={handlePassword}
            value={password}
          />
        </div>
        <div className={classes.actions}>
          <button>{props.isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {props.isLogin
              ? "Create new account"
              : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
