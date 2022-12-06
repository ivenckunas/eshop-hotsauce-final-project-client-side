import React, { useRef } from "react";
import axios from "axios";
import './Auth.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUserId, setCurrentUserName, setLoggedIn } from "../../store/generalStore";

function Auth() {

  const dispatch = useDispatch()
  const nav = useNavigate()

  const emailRef = useRef();
  const pswRef = useRef();
  const pswRepeatRef = useRef();
  const loginEmailRef = useRef();
  const loginPswRef = useRef();

  const register = () => {
    const userObj = {
      email: emailRef.current.value,
      password: pswRef.current.value,
      paswordRepeat: pswRepeatRef.current.value,
    };

    axios
      .post("http://localhost:4000/register", userObj)
      .then(function (response) {
        if (response.data.error === false) {
          dispatch(setCurrentUserName(response.data.data.email));
          dispatch(setCurrentUserId(response.data.data._id));
          dispatch(setLoggedIn(true));
          // setCurrentUser(response.data.email)
          nav('/')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const login = () => {
    const userObj = {
      email: loginEmailRef.current.value,
      password: loginPswRef.current.value,
    };

    axios
      .post("http://localhost:4000/login", userObj)
      .then(function (response) {
        if (response.data.error === false) {
          dispatch(setCurrentUserName(response.data.data.email));
          dispatch(setCurrentUserId(response.data.data._id));
          dispatch(setLoggedIn(true))
          nav('/')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="auth-container">
        <div className="register">
          <h2>Register</h2>
          <input ref={emailRef} type="text" placeholder="email" />
          <input ref={pswRef} type="password" placeholder="password" required />
          <input ref={pswRepeatRef} type="password" placeholder="repeat password" required />
          <button onClick={register}>Register</button>
        </div>
        <div className="login">
          <h2>Login</h2>
          <input ref={loginEmailRef} type="email" placeholder="user email" required />
          <input ref={loginPswRef} type="password" placeholder="password" required />
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Auth;