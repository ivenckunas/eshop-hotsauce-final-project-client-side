import React, { useRef } from "react";
import axios from "axios";
import './Auth.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUserId, setCurrentUserName, setLoggedIn } from "../../store/generalStore";
import { ToastContainer, toast } from 'react-toastify';


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

    if (loginEmailRef.current.value && loginPswRef.current.value) {
      axios
        .post("http://localhost:4000/login", userObj)
        .then(function (response) {
          if (response.data.error === false) {
            localStorage.setItem('userInfo', JSON.stringify(response.data))
            dispatch(setCurrentUserName(response.data.data.email));
            dispatch(setCurrentUserId(response.data.data._id));
            dispatch(setLoggedIn(true))
            nav('/')
          } else {
            const responseErrorMessage = () => toast.error(response.data.message);
            responseErrorMessage()
          }
        })
        .catch(function (error) {
          console.log(error);
          const responseErrorMessage = () => toast.error('Wrong credentials');
          responseErrorMessage()
        });
    } else {
      const errorMessage = () => toast.error("Fields can't be empty!");
      errorMessage()
    }
  };

  return (
    <div className="container login-container">

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />

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