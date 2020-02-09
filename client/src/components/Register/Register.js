import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    let result = await Axios.post("/api/auth/register", {
      name,
      email,
      password
    });
    alert(result.data.message);
  };

  return (
    <div className="register-container">
      <div className="register-title">
        <h1>Welcome to Babble!</h1>
      </div>
      <div className="register-card card-2">
        <div className="register-head">
          <h2>create account</h2>
          <p>You're almost there! We just need a few details.</p>
        </div>
        <div className="register-body">
          <input
            className="register-input"
            type="text"
            placeholder="Jhon Doe"
            onChange={event => setName(event.target.value)}
          />
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
            onChange={event => setPassword(event.target.value)}
          />
          <button className="register-button" onClick={() => registerUser()}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
