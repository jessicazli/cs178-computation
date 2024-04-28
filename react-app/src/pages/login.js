import '../App.css';
import logo from '../logo.png'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Firebase';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

function Login() {

  //const auth = getAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();

   async function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user; //save as global constant (so know where to access database)
        // Storing data in SessionStorage
        sessionStorage.setItem("UserID", user.uid);
        sessionStorage.setItem("firstTime", false);
        
        // Redirect to another page
        navigate("/cabinet");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
  }
  
  return (
    <div className="SignUp">
      <img  src={logo} height={200} className="App-logo" alt="logo"/>
      <header className="Signup-header">
        

        <Typography variant="h6" gutterBottom>
          Please enter your email and password to login
        </Typography>
        
        <TextField
          required
          id="outlined-required"
          label="Email"
          margin="dense"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          margin="dense"
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
        <Link href="/sign-up" variant="body1">
          {"Don't have an account? Sign up here!"}
        </Link>
      
      </header>
    </div>
  );
}

export default Login;
