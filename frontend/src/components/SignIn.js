import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import {
  FaGoogle,
  FaRegistered,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/all";
import PropTypes from "prop-types";
// import useToken from "../components/useToken";
import { FcGoogle } from "react-icons/fc";
import http from "../components/http-common";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

async function loginUser(credentials, url) {
  return fetch(`http://localhost:8000/api/v1/accounts/dj-rest-auth/${url}/`, {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data);
}

export default function SignIn({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resp, setResponse] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = http
      .post("accounts/login/", { username, password })
      .then((resp) => {
        setResponse(resp);
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.response);
        setErrors(err.response.data.detail);
      });
    // if (token.access && token.refresh) {
    //   setToken(token);
    //   window.location.replace("http://localhost:3000/");
    // } else {
    //   sessionStorage.clear();
    //   if (token.non_field_errors) {
    //     setResponse(
    //       "Не возможно войти в систему с указанными учетными данными"
    //     );
    //   } else {
    //     setResponse(token);
    //   }
    // }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const signInWithGoogle = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth.signInWithPopup(provider);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const classes = useStyles();
  // console.log(errors);
  return (
    <Wrapper>
      <div class="wrapper">
        <div className="sigin_content">
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <p>{errors && errors}</p>
            <h1 className="form_title">
              <FaRegistered className="icon" />
              Netakli
            </h1>
            {resp && (
              <div className={"response"}>
                <code>{JSON.stringify(resp.data)}</code>
              </div>
            )}
            <p className="form_text">Введите данные для входа</p>
            <Input
              label={errors ? errors : "Ваше Имя"}
              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="medium"
              type="username"
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={125}
              />
              <p className="register" style={{ marginLeft: "0px" }}>
                <a>Забыли пароль?</a>
              </p>
            </StyledForm>

            <div></div>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{
                background: "#dae4e8",
                color: "black",
                marginLeft: "10.5px",
                width: "100%",
                padding: "10px 20px",
              }}
            >
              Войти
            </Button>
            {/* <p className="register"><Link href="singin1/">Зарегистрироваться</Link></p> */}
            <h3 className="form_text_">ИЛИ</h3>
            <FcGoogle className="icon" />
            <FaRegistered className="icon" />
            <FaFacebook className="icon" />
            <FaTwitter className="icon" />
            <FaLinkedin className="icon" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};

const Wrapper = styled.section`
  display: flex;
  height: 120vh;
  background: #ced6d9;
  width: 100%;
  justify-content: center;
  align-items: center;
  .wrapper {
    display: flex;
  }
  form {
    width: 500px;
    background: #fff;
    padding: 50px 50px;
    border-radius: 10px;
    color: #2d333a;
    .register {
      margin: 12px;
    }
    .icon {
      font-size: 50px;
      margin-right: 10px;
      justify-content: center;
      left: 50%;
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
      display: flex;
      justify-content: center;
      align-items: center;
      color: #2d333a;
      line-height: 36px;
      font-weight: 800;
      font-size: 26px;
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
      padding: 30px;
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
