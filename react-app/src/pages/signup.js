import '../App.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/Firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import logo from '../logo.png'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SignUp() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();


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

        try {
          // Add a new document in collection "cities"
          const userRef = doc(db, "users", user.uid);
          const profileRefAll = doc(userRef,"ingredients", "All")
          const profileRefBasics = doc(userRef,"ingredients", "Basics")
          setDoc(profileRefAll, {
            //List ingredients here, false means does not have, true means have
            "Eggs": true, 
            "Sugar": true, 
            "Salt": true,
            "Pepper": true,
            "Butter": true,
            "Flour": true,
            "Oil": true, 
            "Sliced Bread": true
          },  { merge: true }); //merge ensures new data is added/overwrites old fields, but other fields are untouched
          
          setDoc(profileRefBasics, {
            //List ingredients here, false means does not have, true means have
            "Eggs": true, 
            "Sugar": true, 
            "Salt": true,
            "Pepper": true,
            "Butter": true,
            "Flour": true,
            "Oil": true, 
            "Sliced Bread": true
          },  { merge: true }); //merge ensures new data is added/overwrites old fields, but other fields are untouched
          
          // Storing data in SessionStorage
          sessionStorage.setItem("UserID", user.uid);
          global.firstTime = true 
          navigate("/cabinet");
        } catch (e) {
          alert("Error adding document: ", e);
      }
        
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
      <img  src={logo} height={200} className="App-logo" alt="logo"/>

      <header className="Signup-header">

        <Typography variant="h6" gutterBottom>
          Feeling lazy? Don’t want to go shopping? Don’t know what to make?
        </Typography>
        <Typography variant="h6" gutterBottom>
          Sign up for Make My Menu to generate a variety of customizable 
          recipes based on the ingredients you have in your home! Simply add 
          your food items to your virtual ‘Pantry’, customize your preferences, 
          and click ‘generate’!
        </Typography>
        
        <TextField
          required
          id="outlined-required"
          label="Email"
          margin="dense" 
          style={{width:'35%'}}
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
          style={{width:'35%'}}
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div style={{padding:'2%'}}>
          <Button variant="outlined" margin="dense"
                  onClick={() => {
                    handleSignUp();
                  }}>
              Sign Up!
          </Button>
        </div>
      </header>
    </div>
  );
}

export default SignUp;
