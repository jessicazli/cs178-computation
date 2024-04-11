import '../App.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/Firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import React, { useRef, useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {

  //const auth = getAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

   async function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user; //save as global constant (so know where to access database)
        // Redirect to another page
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
    
  }
    
  

  return (
    <div className="SignUp">
      <header className="Signup-header">
        <p>
            Please enter your email and password to log in
        </p>
        
        <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button variant="outlined"
                onClick={() => {
                  handleLogin();
                }}>
            Login!
        </Button>
        <a
          href="/sign-up"
          target="_blank"
          rel="noopener noreferrer"
        >
          Don't have an account? Sign up here!
        </a>
      </header>
    </div>
  );
}

export default Login;
