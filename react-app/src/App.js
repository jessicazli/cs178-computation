import logo from './logo.svg';
import './App.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './config/Firebase';
import BasicTextFields from './components/TextField';
//import * as React from 'react';
import React, { useRef, useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';

function App() {

  //const auth = getAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

   async function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
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
      </header>
    </div>
  );
}

export default App;
