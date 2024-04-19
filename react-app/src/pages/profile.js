import '../App.css';
import { auth, db } from '../config/Firebase';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 
import React, { useRef, useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import CheckboxControlled from '../components/checkboxControlled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function Profile() {

  const [otherPref, setOtherPref] = useState("")
  const [changedEssentials, setChangedEssentials] = useState([])
  const essentials = ["Sugar", "Salt", "Pepper", "Butter", "Flour", "Oil", "Sliced Bread", "Beef", "Rice", "Chicken", "Noodles", "Carrots", "Potatoes"]
  const [initial, setInitial] = useState({"Sugar":true, "Salt":true, "Pepper":true, "Butter":true, "Flour":true, "Oil":true, "Sliced Bread":true})

  useEffect(() => {
    async function startFetching() {
      // Retrieving data from SessionStorage
      const UserID = sessionStorage.getItem('UserID');

      const userRef = doc(db, "users", UserID);
      const profileRef = doc(userRef,"ingredients", "Basics")

      const docSnap = await getDoc(profileRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        if (!ignore) {
          setInitial(docSnap.data());
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  }, []);

  async function handleSubmit() {
    changedEssentials.forEach((essential) =>{
      savePrefs(essential[0], essential[1])
    })
  }

  async function savePrefs(hasIngred, index) { 
    //saves preferences (for now is the list of basic ingredients)
    
    try {
      // Retrieving data from SessionStorage
      const UserID = sessionStorage.getItem('UserID');

      const userRef = doc(db, "users", UserID);
      const profileRef = doc(userRef,"ingredients", "All")
      var obj = {} //List ingredients here, false means does not have, true means have
      obj[essentials[index]] = hasIngred
      setDoc(profileRef, obj,  { merge: true }); //merge ensures new data is added/overwrites old fields, but other fields are untouched
      
    } catch (e) {
      alert("Error adding document: ", e);
    }

    try {
      // Retrieving data from SessionStorage
      const UserID = sessionStorage.getItem('UserID');
      // Add a new document in collection "cities"
      const userRef = doc(db, "users", UserID);
      const profileRef = doc(userRef,"ingredients", "Basics")
      var obj = {} //List ingredients here, false means does not have, true means have
      obj[essentials[index]] = hasIngred
      setDoc(profileRef, obj,  { merge: true }); //merge ensures new data is added/overwrites old fields, but other fields are untouched
      
    } catch (e) {
      alert("Error adding document: ", e);
    }
  }

  async function changeInitial(item, event){
    //Need this to trigger a re-render
    let newInitial = { ...initial }
    newInitial[item] = event
    setInitial(newInitial)
  }
  
  return (
    <div className="Profile">
      <header className="Profile-header">
        <p>
            Profile
        </p>
        <Typography variant="h6" gutterBottom>
          Essential Ingredients (uncheck the ingredients you don't have)
        </Typography>

        <Box sx={{ width: '10%', m: '2rem'}}>
          
            { essentials.map(function(item, i){
              return <Grid container sx={{ flexGrow: 1 }} justifyContent="flex-start" alignContent="flex-start">
                  <Grid item xs={2}>
                    <CheckboxControlled 
                      className={item}
                      checked={initial[item]}
                      onCheckedChange = {(event) => {
                        changeInitial(item, event);changedEssentials.push([event, i]);
                      }}
                    />
                  </Grid>
                    
                  <Grid item xs={10} >
                    <Typography variant="subtitle1" gutterBottom>
                      {item}
                    </Typography>
                  </Grid>
                </Grid>

            }) 
            }
          
        </Box>
        
        {/*<TextField
          fullWidth
          id="outlined-required"
          label="Other preferences"
          onChange={(event) => {
            setOtherPref(event.target.value);
          }}
        />*/}
        
        <Button variant="outlined"
                onClick={() => {
                  handleSubmit(); alert("Submitted!");
                }}>
            Submit Preferences!
        </Button>
      </header>
    </div>
  );
}

export default Profile;
