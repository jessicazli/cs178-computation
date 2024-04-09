import logo from './logo.svg';
import './App.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './config/Firebase';
import React, { useRef, useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {

  //const auth = getAuth();
  const [email, setEmail] = useState("prinpulkes@college.harvard.edu")
  const [password, setPassword] = useState("test")

   async function handleSignUp() {
    alert('clicked')
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      alert('worked')
      const user = userCredential.user;
      const uid = user.uid
      
      // Add to database
    })
    .catch((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
    
  }
    
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TextField
          required
          id="outlined-required"
          label="Email"
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="outlined"
                onClick={() => {
                  handleSignUp();
                }}>
          Submit
        </Button>
      </header>
    </div>
  );
}

export default App;
