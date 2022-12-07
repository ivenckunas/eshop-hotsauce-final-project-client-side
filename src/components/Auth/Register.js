import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css'

function RegisterPage() {

  const emailRef = useRef();
  const pswRef = useRef();
  const pswRepeatRef = useRef();
  const nav = useNavigate()

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
          console.log('registered successfuly')
          nav('/auth')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container register-container">
      <div className="register">
        <h2>Register</h2>
        <input ref={emailRef} type="text" placeholder="email" />
        <input ref={pswRef} type="password" placeholder="password" required />
        <input ref={pswRepeatRef} type="password" placeholder="repeat password" required />
        <button className='register-btn' onClick={register}>Register</button>
      </div>
    </div>
  )
}

export default RegisterPage