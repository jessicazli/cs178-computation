import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogCloseButton } from "../components/dialog";
import FoodList from "../components/foodList";
import AddGroceries from "../components/addGroceries";
import { db } from '../config/Firebase';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 
import React, { useEffect, useState } from 'react';
import CheckboxControlled from '../components/checkboxControlled';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Cabinet() {

  // TODO: have to figure out clicking on the images to open the correct accordion

  const [activeAccordion, setActiveAccordion] = useState(null);
  //const [openEssentials, setOpenEssentials] = useState(sessionStorage.getItem("firstTime"));
  const [openEssentials, setOpenEssentials] = useState(true); //for test
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

  const handleImageClick = (accordionName) => {
    setActiveAccordion(accordionName);
  };

  function handleClose() {
    setOpenEssentials(false)
    sessionStorage.setItem("firstTime", false)
  }

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
    <div>
      <h2 className="page-title">My Pantry</h2>
      <div className="row">
        <div className="col-6 text-center">
          <div className="images">
            <img src="/images/shelves.png" alt="shelves" className="shelves"/>
            <div className="proteins" onClick={() => handleImageClick('proteins')}>
              <img src="/images/eggs.png" alt="eggs" className="eggs"/>
              <img src="/images/meatloaf.png" alt="meatloaf" className="meatloaf"/>
            </div>
            <img src="/images/vegetable.png" alt="vegetable" className="vegetable" onClick={() => handleImageClick('vegetables')}/>
            <img src="/images/fruit.png" alt="fruit" className="fruit" onClick={() => handleImageClick('fruits')}/>
            <img src="/images/milk.png" alt="milk" className="milk" onClick={() => handleImageClick('dairy')}/>
            <div className="grains" onClick={() => handleImageClick('grains')}>
              <img src="/images/pasta.png" alt="pasta" className="pasta"/>
              <img src="/images/rice.png" alt="rice" className="rice"/>
            </div>
            <img src="/images/bread.png" alt="bread" className="bread" onClick={() => handleImageClick('essentials')}/>
            <img src="/images/honey.png" alt="honey" className="honey" onClick={() => handleImageClick('other')}/>
          </div>
        </div>
        <div className="col-6 text-center">
          <Dialog>
            <DialogTrigger>
                <button type="button" class="btn btn-success">add grocery haul</button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="DialogOverlay"/>
                <DialogContent className="DialogContent">
                    <AddGroceries/>
                    <DialogCloseButton className="IconButton"/>
                </DialogContent>
            </DialogPortal>
          </Dialog>
          <FoodList activeAccordion={activeAccordion} />

          {/* Essentials dialog */}
          <Dialog open = {openEssentials} onOpenChange={setOpenEssentials}>
            {openEssentials === true && 
              <DialogPortal>
                <DialogOverlay className="DialogOverlay"/>
                <DialogContent className="DialogContent">
                    {/* add content here */}
                    <Typography variant="subtitle1" gutterBottom>
                      Essential Ingredients (uncheck the ingredients you don't have)
                    </Typography>

                    <Box sx={{ width: '50%', m: '2rem'}}>
                      
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
                    <Button variant="outlined"
                            onClick={() => {
                              handleSubmit(); alert("Submitted!");handleClose();
                            }}>
                        Submit Preferences!
                    </Button>
                    {/*<DialogCloseButton className="IconButton" onClick={() => {
                        handleClose();
                      }}/>*/}
                    </DialogContent>
            </DialogPortal>}
          </Dialog>
        </div>
      </div>

    </div>
  );
}   

export default Cabinet;