import React, { useEffect } from 'react';
import './King.css';

const King = () => {
  useEffect(() => {
    const formOpenBtn = document.querySelector("#form-open");
    const home = document.querySelector(".home");
    const formContainer = document.querySelector(".form_container");
    const formCloseBtn = document.querySelector(".form_close");
    const signupBtn = document.querySelector("#signup");
    const loginBtn = document.querySelector("#login");
    const pwShowHide = document.querySelectorAll(".pw_hide");

    const handleFormOpen = () => home.classList.add("show");
    const handleFormClose = () => home.classList.remove("show");

    formOpenBtn.addEventListener("click", handleFormOpen);
    formCloseBtn.addEventListener("click", handleFormClose);

    pwShowHide.forEach((icon) => {
      icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
          getPwInput.type = "text";
          icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
          getPwInput.type = "password";
          icon.classList.replace("uil-eye", "uil-eye-slash");
        }
      });
    });

    const handleSignup = (e) => {
      e.preventDefault();
      formContainer.classList.add("active");
    };

    const handleLogin = (e) => {
      e.preventDefault();
      formContainer.classList.remove("active");
    };

    signupBtn.addEventListener("click", handleSignup);
    loginBtn.addEventListener("click", handleLogin);

    // Clean up event listeners on component unmount
    return () => {
      formOpenBtn.removeEventListener("click", handleFormOpen);
      formCloseBtn.removeEventListener("click", handleFormClose);
      pwShowHide.forEach((icon) => {
        icon.removeEventListener("click", () => {
          let getPwInput = icon.parentElement.querySelector("input");
          if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
          } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
          }
        });
      });
      signupBtn.removeEventListener("click", handleSignup);
      loginBtn.removeEventListener("click", handleLogin);
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <>
      <header className="header">
        <nav className="nav">
          <a href="#" className="nav_logo">CodingLab</a>
          <ul className="nav_items">
            <li className="nav_item">
              <a href="#" className="nav_link">Home</a>
              <a href="#" className="nav_link">Product</a>
              <a href="#" className="nav_link">Services</a>
              <a href="#" className="nav_link">Contact</a>
            </li>
          </ul>
          <button className="button" id="form-open">Login</button>
        </nav>
      </header>
      <section className="home">
        <div className="form_container">
          <i className="uil uil-times form_close"></i>
          <div className="form login_form">
            <form action="#">
              <h2>Login</h2>
              <div className="input_box">
                <input type="email" placeholder="Enter your email" required />
                <i className="uil uil-envelope-alt email"></i>
              </div>
              <div className="input_box">
                <input type="password" placeholder="Enter your password" required />
                <i className="uil uil-lock password"></i>
                <i className="uil uil-eye-slash pw_hide"></i>
              </div>
              <div className="option_field">
                <span className="checkbox">
                  <input type="checkbox" id="check" />
                  <label htmlFor="check">Remember me</label>
                </span>
                <a href="#" className="forgot_pw">Forgot password?</a>
              </div>
              <button className="button">Login Now</button>
              <div className="login_signup">Don't have an account? <a href="#" id="signup">Signup</a></div>
            </form>
          </div>
          <div className="form signup_form">
            <form action="#">
              <h2>Signup</h2>
              <div className="input_box">
                <input type="email" placeholder="Enter your email" required />
                <i className="uil uil-envelope-alt email"></i>
              </div>
              <div className="input_box">
                <input type="password" placeholder="Create password" required />
                <i className="uil uil-lock password"></i>
                <i className="uil uil-eye-slash pw_hide"></i>
              </div>
              <div className="input_box">
                <input type="password" placeholder="Confirm password" required />
                <i className="uil uil-lock password"></i>
                <i className="uil uil-eye-slash pw_hide"></i>
              </div>
              <button className="button">Signup Now</button>
              <div className="login_signup">Already have an account? <a href="#" id="login">Login</a></div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default King;
