import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogCloseButton } from "../components/dialog";
import {DialogTitle} from '@radix-ui/react-dialog';
import FoodList from "../components/foodList";
import AddGroceries from "../components/addGroceries";
import { db } from '../config/Firebase';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 
import React, { useEffect, useState } from 'react';
import CheckboxControlled from '../components/checkboxControlled';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FaVihara } from "react-icons/fa";

function Cabinet() {

  const [activeAccordion, setActiveAccordion] = useState("");
  const [openEssentials, setOpenEssentials] = useState(false);
  const [changedEssentials, setChangedEssentials] = useState([])
  const essentials = ["Sugar", "Salt", "Pepper", "Butter", "Flour", "Oil", "Sliced Bread"]
  const [initial, setInitial] = useState({"Sugar":true, "Salt":true, "Pepper":true, "Butter":true, "Flour":true, "Oil":true, "Sliced Bread":true})

  const handleAccordionChange = (category) => {
    const newValue = activeAccordion === category ? "" : category;
    setActiveAccordion(newValue);
  };

  useEffect(() => {
    var open = global.firstTime
    if (open) {
      setOpenEssentials(open)
      global.firstTime = false
    }
    
  }, [])

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
    <div className="pantry-page">
      <h2 className="page-title">My Pantry</h2>
      <div className="row">
        <div className="col-6 text-center">
          <div className="images">
            <img src="/images/Shelf.svg" alt="shelf" className="shelf"/>
            <img src="/images/Proteins.svg" alt="proteins" className="proteins" onClick={() => handleAccordionChange("Proteins")}/>
            <img src="/images/Vegetables.svg" alt="vegetables" className="vegetables" onClick={() => handleAccordionChange("Vegetables")}/>
            <img src="/images/Fruits.svg" alt="fruits" className="fruits" onClick={() => handleAccordionChange("Fruits")}/>
            <img src="/images/Dairy.svg" alt="dairy" className="dairy" onClick={() => handleAccordionChange("Dairy")}/>
            <img src="/images/Grains.svg" alt="grains" className="grains" onClick={() => handleAccordionChange("Grains")}/>
            <img src="/images/Essentials.svg" alt="essentials" className="essentials" onClick={() => handleAccordionChange("Basics")}/>
            <img src="/images/Other.svg" alt="other" className="other" onClick={() => handleAccordionChange("Other")}/>
          </div>
        </div>
        <div className="col-6 text-center">
          <Dialog>
            <DialogTrigger>
                <button type="button" class="btn btn-success">Add Items</button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="DialogOverlay"/>
                <DialogContent className="DialogContent">
                    <AddGroceries/>
                    <DialogCloseButton className="IconButton"/>
                </DialogContent>
            </DialogPortal>
          </Dialog>
          <FoodList activeAccordion={activeAccordion} setValue={handleAccordionChange} />

          {/* Essentials dialog */}
          <Dialog open = {openEssentials} onOpenChange={setOpenEssentials}>
              <DialogPortal>
                <DialogOverlay className="DialogOverlayEssentials"/>
                <DialogContent className="DialogContentEssentials"
                  onPointerDownOutside={(e) => e.preventDefault()}
                  onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogTitle className="DialogTitleEssentials">Essential Ingredients</DialogTitle>
                    <Typography variant="body2" gutterBottom>
                     Unselect any ingredients you don't have and click the Submit Preferences button!
                     This 'Essential Ingredients' category is for the ingredients you'll have in 
                     your pantry most of the time and won't have to add or remove often. 
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      We've suggested some 'essential ingredients' below, but you can definitely add more
                     to this list with the 'add grocery haul' button in Your Pantry. 
                    </Typography>

                    <Box sx={{ width: '100%', m: '2rem', display: 'flex', flexDirection: 'row', overflow: 'auto'}}>
                      <Grid container sx={{ flexGrow: 1, minWidth:'20%' }} justifyContent="flex-start" alignContent="flex-start">
                        { essentials.map(function(item, i){
                          return <Grid item xs={4} sx={{display: 'flex', flexDirection: 'row'}}>
                            <Grid item xs={3}>
                              <CheckboxControlled 
                                className={item}
                                checked={initial[item]}
                                onCheckedChange = {(event) => {
                                  changeInitial(item, event);changedEssentials.push([event, i]);
                                }}
                              />
                            </Grid>
                                
                            <Grid item xs={9} >
                              <Typography variant="subtitle1" gutterBottom>
                                {item}
                              </Typography>
                            </Grid>
                          </Grid>

                        }) 
                        }
                      </Grid>
                      
                    </Box>
                    <div style={{display:'flex', justifyContent: 'center'}}>
                      <button type="button" class="btn btn-success" 
                        onClick={() => {handleSubmit();handleClose();window.location.reload();}}>
                        save essentials!
                      </button>

                    </div>
                  </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      </div>

    </div>
  );
}   

export default Cabinet;