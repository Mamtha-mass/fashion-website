import React, { useState } from 'react';
import './styles.css'
import axios from 'axios'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config'; 
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleUsernameChange = (event) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignin = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("User signed in successfully:", user);
          navigate('/home'); 
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };



  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="buttons">
            <button className="signUp" onClick={handleSignin}>Sign In</button>
            <span className="or">-------OR-------</span>
            <div className="signin-section">
                <p className="already-have">Already have an account?</p>
            <button className="signIn" onClick={() => { window.location.href = '/registation'; }}>Sign Up</button>
            </div>
        </div>
    </div>
  );
};

export default SignUp;
