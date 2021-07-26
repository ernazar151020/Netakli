import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";
import loginUser from "./SignIn";
import aiosInstance from "../components/http-common";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function SignIn1(props, { setToken }) {
  // const { setUsers, users } = props;
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [resp, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const jwtToken = localStorage.getItem("jwtToken");
  // const [users, setUsers] = useState(localStorage.getItem("jwtTokens"));

  // *********FUNCTIONS***************------------***********

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword1 = (e) => {
    setPassword1(e.target.value);
  };

  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const signInWithGoogle = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !password1 && !password2) {
      return setErrors("Поле не может быть пустыми");
    }
    const resonse = aiosInstance
      .post("accounts/registration/", {
        username,
        password: password1,
        password2,
      })
      .then((data) => {
        setErrors(null);
        localStorage.setItem("jwtToken", JSON.stringify(data.data));
      })
      .then(() => window.location.replace("/"))
      .catch((err) => {
        setErrors(err.response);
        // console.log(err.response);
        // setErrors("");
      });
  };

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const classes = useStyles();
  // useEffect(() => {
  //   if (localStorage.getItem("jwtToken") !== null) {
  //     window.location.replace("http://localhost:3000/");
  //     // window.location.replace("http://localhost:3001/");
  //   } else {
  //     setLoading(false);
  //   }
  //   console.log(localStorage.getItem("jwtToken") !== null);
  // }, []);
  if (jwtToken) {
    return <Redirect to="/" />;
  }
  // ***************BODY**************-------___---------____-__-_--_----___-__
  return (
    <Wrapper>
      <div className="sigin_content">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1 className="form_title">RanDOMChat</h1>
          {/* {loading === false && <p className="form_text">Регистрация</p>}
          {resp && (
            <div className={"response"}>
              <code>{resp}</code>
            </div>
          )} */}
          <p className="signup_error">{errors ? errors.data.password : ""}</p>
          {/* <p className="signup_error">{errors ? errors : " "}</p> */}

          <Input
            label={
              errors ? errors.data.username : "Введите адрес электроной почты"
            }
            id="outlined-size-small"
            defaultValue=""
            variant="outlined"
            size="medium"
            type="text"
            value={username}
            onChange={handleUsername}
            error={errors ? true : false}
          />
          <StyledForm
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Введите пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword1 ? "text" : "password"}
              value={password1}
              onChange={handlePassword1}
              error={errors ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword1}
                    edge="end"
                  >
                    {showPassword1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={125}
            />
          </StyledForm>

          <StyledForm
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password2">
              Повторите пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password2"
              type={showPassword2 ? "text" : "password"}
              value={password2}
              onChange={handlePassword2}
              error={errors ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                    edge="end"
                  >
                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={140}
            />
          </StyledForm>

          <div></div>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{
              marginLeft: "11px",
              width: "100%",
              padding: "10px 20px",
            }}
          >
            Зарегистрироваться
          </Button>
          <h3 className="form_text_">ИЛИ</h3>
          <button
            className="sign_up_with_google"
            onClick={signInWithGoogle}
            type="button"
          >
            <FcGoogle className="icon" />
            Войти через Google
          </button>
        </form>
      </div>
    </Wrapper>
  );
}

SignIn1.propTypes = {
  setToken: PropTypes.func.isRequired,
};

// CSCSCSCSCSCSCSCSSCCSCCSSCSCSCSCSCCCSSCSSCSSCSSCSSCSSCSSCSSCSSC

const Wrapper = styled.section`
  display: flex;
  height: 130vh;
  background: #000;
  width: 100%;
  justify-content: center;
  align-items: center;
  .signup_error {
    color: red;
    text-align: center;
  }
  form {
    width: 500px;
    background: #fff;
    padding: 50px 50px;
    border-radius: 10px;
    color: #2d333a;
    .icon {
      font-size: 30px;
      margin-right: 40px;
      justify-content: center;
    }
    .sign_up_with_google {
      padding: 10px 40px;
      border: 1px solid #0a0a0a;
      border-radius: 10px;
      background: #fff;
      outline: none;
      width: 80%;
      margin: 0 auto;
      color: red;
      display: flex;
      align-items: center;
      font-size: 17px;
      color: #0a0a0a;
      white-space: nowrap;
      cursor: pointer;
    }
    .form_title {
      text-align: center;
      color: #2d333a;
      line-height: 36px;
      font-weight: 800;
      font-size: 24px;
    }
    .form_text {
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      text-align: center;
    }
    .form_text_ {
      margin: 30px 0;
      text-align: center;
      position: relative;
      :before {
        position: absolute;
        content: "";
        top: 50%;
        width: 50%;
        height: 1px;
        right: -20px;
        background: #0a0a0a;
      }
      :after {
        position: absolute;
        content: "";
        top: 50%;
        width: 50%;
        height: 1px;
        left: -20px;
        background: #0a0a0a;
      }
    }
    @media (max-width: 768px) {
      padding: 20px;
      width: 100%;
    }
  }
`;
const Input = styled(TextField)`
  width: 100%;
  background: #fff;
  border-radius: 7px;
  outline: none;
  margin-bottom: 25px;
`;
const StyledForm = styled(FormControl)`
  width: 100%;
  background: #fff;
  border-radius: 7px;
  outline: none;
  margin-left: 10px;
  margin-top: 25px;
  margin-bottom: 25px;
`;
