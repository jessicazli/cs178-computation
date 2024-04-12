import logo from '../logo.svg';
import '../App.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/Firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import React, { useRef, useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Profile() {

  //const auth = getAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

   async function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
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
    <div className="SignUp">
      <header className="Signup-header">
        <p>
            Profile
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
                  handleSignUp();
                }}>
            Sign Up!
        </Button>
      </header>
    </div>
  );
}

export default Profile;
