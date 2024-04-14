import { useState } from "react";
import OpenAI from "openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

function Recipe() {
    const [result, setResult] = useState(null);
    const [cooking_time, setCookingTime] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [servingSize, setServingSize] = useState(2);
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [mealType, setMealType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [cookingTimeInput, setCookingTimeInput] = useState("");
    const [dish_name, setDishName] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("form submitted");

        const messages = [
            {
              role: "user",
              content: `Give me a ${mealType} recipe. Serving size is ${servingSize} people and dietary restrictions are ${dietaryRestrictions}. The difficulty level should be ${difficulty}. Return JSON with the dish_name, cooking time, ingredients list (in an array), and the recipe of course. Do not use newline or slash characters except for inside the recipe string.`,
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
        setIngredients(recipe_dict.ingredients);
        setDishName(recipe_dict.dish_name);

    }

    return (
      <div className="container">
      <h2 className="text-center mb-4">Generate a Recipe</h2>
      <div className="row justify-content-center">
    <div className="col-md-8">
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
            <label htmlFor="cookingTime" className="form-label">Cooking Time:</label>
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
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="dietaryRestrictions" className="form-label">Dietary Restrictions:</label>
          <select
            id="dietaryRestrictions"
            className="form-select"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          >
            <option value="">None</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-free">Gluten-free</option>
            <option value="Dairy-free">Dairy-free</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">Generate Recipe</button>
        </div>
      </form>
    </div>
  </div>
      {result && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{dish_name}</h3>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  }   
  
  export default Recipe;