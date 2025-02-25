// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("Admin");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mock authentication
    if (username === "Admin" && password === "Admin") {
      navigate("/rental-list");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <html className="login-Body">
      <body className="login-Body">
        <div className="login-container">
          <h2>Hamdamn Car Rentals</h2>
          <form className="login-Form" onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-Button" type="submit">Login</button>
          </form>
        </div>
      </body>
    </html>
  );
};

export default Login;
