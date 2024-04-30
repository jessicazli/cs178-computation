import { useState, useEffect } from "react";
import OpenAI from "openai";
import '../App.css';
import { Button } from "@mui/material";
import { db } from '../config/Firebase';
import { setDoc, doc, getDoc } from "firebase/firestore"; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { grid } from 'ldrs'
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

//recipe concept

grid.register()

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Recipe() {
    const [result, setResult] = useState(null);
    const [cooking_time, setCookingTime] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [servingSize, setServingSize] = useState(2);
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [mealType, setMealType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [cookingTimeInput, setCookingTimeInput] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [otherPrefs, setOtherPrefs] = useState("");
    const [dish_name, setDishName] = useState("");
    const [initial, setInitial] = useState(null);

    const [itemNames, setItemNames] = React.useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setItemNames(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const dietaryPrefList = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free']

    useEffect(() => {
        startFetching();
    }, []);
    

    async function startFetching() {

      // Retrieving data from SessionStorage
      const UserID = sessionStorage.getItem('UserID');

      const userRef = doc(db, "users", UserID);
      const profileRef = doc(userRef,"ingredients", "All")
  
      const docSnap = await getDoc(profileRef);
  
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
  
        setInitial(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    async function handleSubmit(e) {
        document.getElementById("loader").style.display = "block";
        e.preventDefault();
        console.log("form submitted");

        let cabinet;

        if (initial != null) {
            console.log(initial);
            cabinet = Object.keys(initial).filter(
                ingredient => initial[ingredient]
            );
        }

        console.log(cabinet);

        const messages = [
            {
              role: "user",
              content: `Give me a ${mealType}, ${cuisine} recipe using only these ingredients: ${cabinet}. 
              You don't have to use all of these ingredients for the recipe, 
              but you cannot use any ingredients outside of this list.
              Please give amounts for the ingredients as well such as 2 eggs or 1 cup of flour. 
              Serving size is ${servingSize} people and dietary restrictions are ${dietaryRestrictions}. 
              The difficulty level should be for ${difficulty} and the maximum cooking time for the recipe is ${cookingTimeInput} minutes. 
              Also take into account these other preferences: ${otherPrefs}.
              Return JSON with the dish_name, cooking_time, ingredients_list 
              (in an array), and the steps of the recipe. 
              Do not use newline or slash characters except for inside the recipe string.`,
            },
        ];

        const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
        response_format:{ "type": "json_object" },
        });

        const response = completion.choices[0].message;
        console.log(response);
        const recipe_dict = JSON.parse(response.content);

        setResult(recipe_dict.recipe);
        setCookingTime(recipe_dict.cooking_time);
        setIngredients(recipe_dict.ingredients_list);
        setDishName(recipe_dict.dish_name);

        document.getElementById("loader").style.display = "none";

    }

    async function handleSaveRecipe() {
      //save these setResult(recipe_dict.recipe); setCookingTime(recipe_dict.cooking_time);setIngredients(recipe_dict.ingredients);setDishName(recipe_dict.dish_name);
      
      try {
        // Retrieving data from SessionStorage
        const UserID = sessionStorage.getItem('UserID');

        const userRef = doc(db, "users", UserID);
        const profileRef = doc(userRef,"saved_recipes", dish_name)
        var obj = {
          "recipe":result,
          "cooking_time": cooking_time,
          "ingredients": ingredients,
          "dish_name": dish_name
        } 
        setDoc(profileRef, obj); //merge ensures new data is added/overwrites old fields, but other fields are untouched
        alert("Recipe Saved!")
      } catch (e) {
        alert("Error adding document: ", e);
      }
    }

    return (
      // <div className="container row">
      <div>
      <img src="/images/kitchen.png" alt="kitchen" className="background-image kitchen bg-image" />
      <div className="container col-md-5 recipe">
      <h2 className="text-center mb-4">Generate a Recipe</h2>
      <p className="text-left mb-4">Using the ingredients from your virtual pantry, we will generate a 
        recipe you can make right now without going to the grocery store.
        <Tooltip placement="right" title="The preferences you enter will be used in a prompt we write, which is 
        fed to ChatGPT 3.5 to generate your recipe! However, the model results are not 100% accurate and 
        some preferences might not be accounted for in the generated recipe. If this happens and you are unhappy 
        with your generated recipe, simply click the 'Generate Recipe' button again for a new recipe!">
          <IconButton>
            <HelpOutlineIcon fontSize="small" sx={{width:'15px'}}/>
          </IconButton>
        </Tooltip>
      </p>

      <div className="row justify-content-center">
    <div className="col-md-12">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-sm-6">
            <label htmlFor="servingSize" className="form-label">Serving Size:</label>
            <input
              type="number"
              id="servingSize"
              className="form-control"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="cookingTime" className="form-label">Max Cooking Time (in min):</label>
            <input
              type="text"
              id="cookingTime"
              className="form-control"
              value={cookingTimeInput}
              onChange={(e) => setCookingTimeInput(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-6">
            <label htmlFor="mealType" className="form-label">Meal Type:</label>
            <select
              id="mealType"
              className="form-select"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
          <div className="col-sm-6">
            <label htmlFor="difficulty" className="form-label">Difficulty:</label>
            <select
              id="difficulty"
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-6">
          
          <label htmlFor="dietaryRestrictions" className="form-label">Dietary Restrictions:</label>
            <Select
              labelId="dietaryRestrictions"
              className="form-select"
              id="dietaryRestrictions"
              multiple
              value={itemNames}
              onChange={handleChange}
              input={<OutlinedInput label="Name"/>}
              IconComponent	= {null}
              MenuProps={MenuProps}
              sx={{ maxHeight: '40px' }}
            >
              {dietaryPrefList.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="col-sm-6">
            <label htmlFor="cuisine" className="form-label">Cuisine:</label>
            <input
              type="text"
              id="cuisine"
              className="form-control"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="otherPrefs" className="form-label">Any other preferences?</label>
          <input
            type="text"
            id="otherPrefs"
            className="form-control"
            placeholder="Enter any other preferences you have here e.g. an ingredient you want to use, dish type, etc."
            value={otherPrefs}
            onChange={(e) => setOtherPrefs(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">Generate Recipe</button>
        </div>
      </form>
        <l-grid
        size="60"
        speed="1.5" 
        color="gray" 
        id="loader"
        ></l-grid>
    </div>
  </div>
      {result && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="save-recipe">
                  <h3 className="card-title" style={{fontWeight: "bold"}}>{dish_name}</h3>
                  <Button className="save-recipe-but" endIcon={ <FavoriteBorderIcon/>}
                    onClick={() => {
                      handleSaveRecipe();
                    }}>
                    Save Recipe
                  </Button>
                 
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <strong>Cooking Time:</strong> {cooking_time}
                </p>
                <p className="card-text">
                  <strong>Ingredients:</strong>
                  <ul>
                    {ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </p>
                <p className="card-text">
                  <strong>Instructions:</strong>
                  <pre>{result}</pre>
                </p>
                <img src="/images/pin.png" className="pushpin"></img>

              </div>
            </div>
            <p></p>
          </div>
        </div>
      )}
    </div>
    </div>
    );
  }   
  
  export default Recipe;