import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Register.css";

const BACKEND_URL = import.meta.env.BACKEND_URL


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const notify = (message) => toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const handleError = (error) => {
    toast.error(error.response?.data?.message || "An error occurred", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Basic form validation
    if (!username || !email || !password || !role) {
      // If any required field is empty, show an error toast
      toast.error('Please fill all required fiels.', {
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
  
    // Further validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // If email format is incorrect, show an error toast
      toast.error('Please enter a valid email address.', {
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
  
    // If all validations pass, proceed with form submission
    axios
      .post(BACKEND_URL + '/register', { username, email, password, role })
      .then((res) => {
        console.log(res);
        if (role === 'as a visitor' || role === 'as a creator') {
          notify('🦄 Congrats you have successfully registered!');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          console.error('Invalid role:', role);
        }
      })
      .catch((err) => {
        console.error(err);
        handleError(err);
      });
  };
  

  return (
    <>
      <div className="div1">
        <div className="div2">
          <h2 className="h2">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="label1">Username</label><br />
              <input
                id="username"
                className="input1"
                type="text"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="label1">Email</label><br />
              <input
                id="email"
                className="input1"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="label1">Password</label><br />
              <input
                id="password"
                className="input1"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label htmlFor="role" className="label1">Select Role</label><br />

            <div className="custom-select1">
              <select id="role" className="select1" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="" className="select-selected">Select role</option>
                <option value="as a visitor" className="select-selected">As a Visitor</option>
                <option value="as a creator" className="select-selected">As a Creator</option>
              </select>
            </div>

            <button type="submit" className="signup_btn">Sign Up</button>
          </form>

          <br />
          <p className="p1">Already have an account?</p>
          <Link to="/login" title="Go to Login page">
            <button className="signup_btn">Login</button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
