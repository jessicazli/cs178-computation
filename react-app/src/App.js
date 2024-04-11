import logo from './logo.svg';
import './App.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './config/Firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import React, { useRef, useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {

  //const auth = getAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

   async function handleSignUp() {
    alert('clicked')
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      alert('worked')
      const user = userCredential.user;
      const uid = user.uid
      
      
      // Add to database
      try {
        // Add a new document in collection "cities"
        setDoc(doc(db, "users", user.uid), {
          email: user.email,
          uid: user.uid
        });
        
        //console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        alert("Error adding document: ", e);
      }
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
                  handleSignUp();
                }}>
          Submit
        </Button>
      </header>
    </div>
  );
}

export default App;
