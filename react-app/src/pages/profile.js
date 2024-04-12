import logo from '../logo.svg';
import '../App.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/Firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import React, { useRef, useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Checkbox from '../components/checkbox';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Profile() {

  //const auth = getAuth();
  const [otherPref, setOtherPref] = useState("")

  async function savePrefs() { 
    //saves preferences (for now is the list of basic ingredients)
    

    try {
      // Add a new document in collection "cities"
      const userRef = doc(db, "users", global.UserID);
      const profileRef = doc(userRef,"ingredients", "All")
      setDoc(profileRef, {
        //List ingredients here, false means does not have, true means have
        candy: false,
        sugar: true
      },  { merge: true }); //merge ensures new data is added/overwrites old fields, but other fields are untouched
      
    } catch (e) {
      alert("Error adding document: ", e);
    }

    try {
      // Add a new document in collection "cities"
      const userRef = doc(db, "users", global.UserID);
      const profileRef = doc(userRef,"ingredients", "Basics")
      setDoc(profileRef, {
        //List ingredients here, false means does not have, true means have
        candy: false,
        sugar: true
      },  { merge: true }); //merge ensures new data is added/overwrites old fields, but other fields are untouched
      
    } catch (e) {
      alert("Error adding document: ", e);
    }
    
  }
    


  return (
    <div className="SignUp">
      <header className="Signup-header">
        <p>
            Profile
        </p>
        <p>
            Any other preferences?
        </p>
        <Checkbox 
          id="basic-ingredients"
          checked
        />
        <TextField
          fullWidth
          id="outlined-required"
          label="Other preferences"
          onChange={(event) => {
            setOtherPref(event.target.value);
          }}
        />
        
        <Button variant="outlined"
                onClick={() => {
                  alert(global.UserID);savePrefs();
                }}>
            Submit Preferences!
        </Button>
      </header>
    </div>
  );
}

export default Profile;
