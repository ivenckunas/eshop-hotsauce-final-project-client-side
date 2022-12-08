import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css'
import { ToastContainer, toast } from 'react-toastify';


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

    if (emailRef.current.value && pswRef.current.value && pswRepeatRef.current.value) {
      axios
        .post("http://localhost:4000/register", userObj)
        .then(function (response) {
          if (response.data.error === false) {
            nav('/auth')
          } else {
            const responseErrorMessage = () => toast.error(response.data.message);
            responseErrorMessage()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const errorMessage = () => toast.error("Fields can't be empty!");
      errorMessage()
    }
  };

  return (
    <div className="container register-container">

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