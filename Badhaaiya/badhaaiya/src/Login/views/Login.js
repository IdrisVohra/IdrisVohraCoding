import React, { useState } from "react";
import "../css/Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice";
import { useNavigate } from "react-router-dom";

async function isValidInput(mobileNumber, password) 
{
  if (mobileNumber === "" || password === "") 
  {
    return false;
  }
  else 
  {
    return true;
  }
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isValidInput(mobileNumber, password)) 
    {
      setIsValid(true);
      setIsLogin(true);
      dispatch(login());
      navigate("/HomePage");
    }
    else
    {
      setIsValid(false);
      setIsLogin(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="logo">BA;)HAAIYA</h1>
      <div className="auth-container-card">
        {isLogin ? (
          <>
            <h2>Sign in your account</h2>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                placeholder="Enter your number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn login-btn" onClick={handleLogin}>Login</button>
            {!isValid && <p className="error">Invalid credentials! Redirecting to Sign Up...</p>}
            <p>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Sign up</a></p>
          </>
        ) : (
          <>
            <h2>Sign up</h2>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                placeholder="Enter your number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <button className="btn send-otp">Send OTP</button>
            </div>
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="btn verify-otp">Verify OTP</button>
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="terms">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <span>By continuing, you agree to Badhaaiya’s <a href="#">Terms and Conditions</a></span>
            </div>
            <button className="btn signup-btn">Sign me up</button>
            <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Sign in</a></p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
