import React, { useRef } from "react";
import axios from "axios";
import './Auth.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUserId, setCurrentUserName, setLoggedIn } from "../../store/generalStore";

function Auth() {

  const dispatch = useDispatch()
  const nav = useNavigate()

  const loginEmailRef = useRef();
  const loginPswRef = useRef();


  const login = () => {
    const userObj = {
      email: loginEmailRef.current.value,
      password: loginPswRef.current.value,
    };

    axios
      .post("http://localhost:4000/login", userObj)
      .then(function (response) {
        if (response.data.error === false) {
          localStorage.setItem('userInfo', JSON.stringify(response.data))
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
    <div className="container login-container">
      <div className="login">
        <h2>LOGIN</h2>
        <input ref={loginEmailRef} type="email" placeholder="user email" required />
        <input ref={loginPswRef} type="password" placeholder="password" required />
        <button className="login-btn" onClick={login}>Login</button>
      </div>
      <Link className="register-link" to={'/register'}>Don't have an account? Register here</Link>
    </div>
  );
}

export default Auth;