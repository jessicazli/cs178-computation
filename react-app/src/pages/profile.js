import '../App.css';
import { auth, db } from '../config/Firebase';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 
import React, { useRef, useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import CheckboxControlled from '../components/checkboxControlled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Profile() {

  //const auth = getAuth();
  const [otherPref, setOtherPref] = useState("")
  const [changedEssentials, setChangedEssentials] = useState([])
  const essentials = ["Eggs", "Sugar", "Salt", "Pepper", "Butter", "Flour", "Oil", "Sliced Bread"]
  const [initial, setInitial] = useState({"Eggs":true, "Sugar":true, "Salt":true, "Pepper":true, "Butter":true, "Flour":true, "Oil":true, "Sliced Bread":true})

  useEffect(() => {
    async function startFetching() {
      const userRef = doc(db, "users", global.UserID);
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
      const userRef = doc(db, "users", global.UserID);
      const profileRef = doc(userRef,"ingredients", "All")
      var obj = {} //List ingredients here, false means does not have, true means have
      obj[essentials[index]] = hasIngred
      setDoc(profileRef, obj,  { merge: true }); //merge ensures new data is added/overwrites old fields, but other fields are untouched
      
    } catch (e) {
      alert("Error adding document: ", e);
    }

    try {
      // Add a new document in collection "cities"
      const userRef = doc(db, "users", global.UserID);
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
    <div className="SignUp">
      <header className="Signup-header">
        <p>
            Profile
        </p>
        <p>
            Essential Ingredients (uncheck the ingredients you don't have)
        </p>
        { essentials.map(function(item, i){
          return <div>
            
            <CheckboxControlled 
              className={item}
              checked={initial[item]}
              onCheckedChange = {(event) => {
                changeInitial(item, event);changedEssentials.push([event, i]);
              }}
            />
          
            <p>
              {item}
            </p>

          </div>
        }) 
        }
        
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
                  alert(global.UserID);handleSubmit();
                }}>
            Submit Preferences!
        </Button>
      </header>
    </div>
  );
}

export default Profile;
