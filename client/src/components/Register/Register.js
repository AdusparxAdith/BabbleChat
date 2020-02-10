import React, { useEffect, useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [redirect, setRedirect] = useState(false);

  const registerUser = async () => {
    let API = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    let result = await Axios.post(API, {
      name,
      email,
      password
    });
    alert(result.data.message);
    if (result.status === 200) setRedirect(true);
  };

  return (
    <Fragment>
      {redirect ? <Redirect to="/chat" /> : ""}
      <div className="register-container">
        <div className="register-title">
          <h1>Welcome to Babble!</h1>
        </div>
        <div className="register-card card-2">
          {mode === "signup" ? (
            <div className="register-head">
              <h2>create account</h2>
              <p>You're almost there! We just need a few details.</p>
            </div>
          ) : (
            ""
          )}
          <div className="register-body">
            {mode === "signup" ? (
              <input
                className="register-input"
                type="text"
                placeholder="Jhon Doe"
                onChange={event => setName(event.target.value)}
              />
            ) : (
              ""
            )}
            <input
              className="register-input"
              type="email"
              placeholder="jhondoe@gmail.com"
              onChange={event => setEmail(event.target.value)}
            />
            <input
              className="register-input"
              type="password"
              placeholder="Password"
              minlength="8"
              required
              onChange={event => setPassword(event.target.value)}
            />
            <button className="register-button" onClick={() => registerUser()}>
              {mode === "login" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
        {mode === "login" ? (
          <div className="register-signup">
            <p>
              Don't have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        ) : (
          <div className="register-signup">
            <p>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setMode("login")}
              >
                Sign In
              </span>
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
}
