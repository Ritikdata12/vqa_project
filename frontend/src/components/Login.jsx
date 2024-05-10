import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import jsonData from './ss.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL = import.meta.env.BACKEND_URL

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const randomQuestion = jsonData[Math.floor(Math.random() * jsonData.length)];
    setCurrentQuestion(randomQuestion);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic field validation
    if (!email || !password || !securityAnswer) {
      toast.error('Please fill all required fields correctly.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page after 5000ms (5 seconds)
      }, 3000);
      return;
    }
    

    // Check security answer
    if (securityAnswer.toLowerCase() !== currentQuestion.answer.toLowerCase()) {
      toast.error(' Your answer is wrong, answer the question correctly.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    axios.post(BACKEND_URL + '/login', { email, password })
      .then((result) => {
        if (result.data.status === 'success') {
          toast.success('🎉 Login successful!', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        } else {
          toast.error('Login failed. Please check your credentials.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 10000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('An error occurred. Please try again later.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleSignUp = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <div className="signup_container">
        <div className="sign">
          <h2 className="login">Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <br />
              <input
                className="input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <br />
            </div>

            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <br />
              <input
                className="input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="question-card">
              <img src={currentQuestion.image_id} className='img1' alt={`Question`} />
              <p className='p'>{currentQuestion.question}</p>
              <input 
                className='input1'
                type="text"
                placeholder="Your answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
              />
            </div>

            <button type="submit" className="signup_btn">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
