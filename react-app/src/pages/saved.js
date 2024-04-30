import React from "react";
import { useState, useEffect } from "react";
import Masonry from "react-responsive-masonry";
import { db } from '../config/Firebase';
import { setDoc, doc, getDoc } from "firebase/firestore"; 
import { collection, getDocs }from "firebase/firestore";
import { grid } from 'ldrs'

// cookbook concept

grid.register()

function Saved() {

  const [savedRecipes, setRecipes] = useState(null);

    useEffect(() => {
        async function startFetching() {
          // Retrieving data from SessionStorage
          const UserID = sessionStorage.getItem('UserID');
          const userDocRef = doc(db, "users", UserID);
          //const profileRef = doc(userDocRef,"ingredients", "All")


          const querySnapshot = await getDocs(collection(userDocRef, "saved_recipes"));
          const recipes = querySnapshot.docs.map((doc) => doc.data());
          console.log(recipes);
          setRecipes(recipes);
        }
    
        let ignore = false;
        startFetching();
        return () => {
          ignore = true;
        }
      }, []);

      if (savedRecipes === null) {
        return     <l-grid
        size="60"
        speed="1.5" 
        color="gray" 
        id="loader"
        ></l-grid>;
      }

  const items = savedRecipes.map((recipe, index) => (
    <div className="card recipe-boxes">
        <div className="note">
        <div className="card-header">
        <div className="">
            <h3 className="card-title" style={{fontWeight: "bold"}}>{recipe.dish_name}</h3>
            {/* <Button className="save-recipe-but" endIcon={ <FavoriteBorderIcon/>}
            onClick={() => {
                handleSaveRecipe();
            }}>
            Save Recipe
            </Button> make it space between */}
            
        </div>
        </div>
        <div className="card-body">
        <p className="card-text">
            <strong>Cooking Time:</strong> {recipe.cooking_time}
        </p>
        <hr className="paper-line"/>
        <p className="card-text">
            <strong>Ingredients:</strong>
            <ul>
            {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
            </ul>
        </p>
        <hr className="paper-line"/>
        <p className="card-text">
            <strong>Instructions:</strong>
            <pre>{recipe.recipe}</pre>
        </p>
        <img src="/images/pin.png" className="pushpin"></img>
        </div>
    </div>
    </div>
  ));

  return (
    <div className="App">
      <div className="tackboard">
      <Masonry columnsCount={3} gutter="0px">
        {items}
      </Masonry>
      </div> 
    </div>
  );
}

export default Saved;