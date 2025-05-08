import React, { useState } from 'react';
import axios from 'axios';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config'; 
import './styles.css';  
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log("User created successfully:", user);
          navigate('/home'); 
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstname}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastname}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="buttons">
            <button className="signUp" onClick={handleSubmit}>Sign Up</button>
            <span className="or">-------OR-------</span>
            <div className="signin-section">
                <p className="already-have">Already have an account?</p>
            <button className="signIn" onClick={() => { window.location.href = '/'; }}>Sign In</button>
            </div>
        </div>

      </form>
    </div>
  );
};

export default Registration;
