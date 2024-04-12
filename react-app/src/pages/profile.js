import logo from '../logo.svg';
import '../App.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/Firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import React, { useRef, useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


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
        const profileRef = doc(userRef,"profile", "preferences")
        setDoc(profileRef, {
          candy: false,
          sugar: true
        },  { merge: true }); //merge ensures new data is added/overwrites old fields, but other fields are untouched
        
      } catch (e) {
        alert("Error adding document: ", e);
    }
    
  }
    

  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }


  return (
    <div className="SignUp">
      <header className="Signup-header">
        <p>
            Profile
        </p>
        <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
        />
        <p>
            Any other preferences?
        </p>
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
