import React, { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeCard from "../components/RecipeCard";
import { searchRecipesByIngredient, getRandomRecipe, getRecipeDetailsById } from "../api/mealdb";
import { saveToFavorites, getFavorites, removeFromFavorites } from "../utils/storage";

const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [favorites, setFavorites] = useState(getFavorites());

  const addIngredient = (ing) => {
    setIngredients([...ingredients, ing]);
  };

  const search = async () => {
    if (ingredients.length === 0) return;
    const res = await searchRecipesByIngredient(ingredients[0]);
    setRecipes(res.meals || []);
  };

  const handleSave = (recipe) => {
    saveToFavorites(recipe);
    setFavorites(getFavorites());
  };

  const showRandom = async () => {
    const res = await getRandomRecipe();
    setRandomRecipe(res.meals[0]);
  };

  return (
    <div>
      <h1>🍳 Smart Recipe Assistant</h1>
      <IngredientInput onAdd={addIngredient} />
      <div>
        Selected: {ingredients.map((i, idx) => <span key={idx}>{i} </span>)}
        <button onClick={search}>Search Recipes</button>
      </div>

      <h2>🥗 Recipes</h2>
      <div className="recipes">
        {recipes.map((r) => (
          <RecipeCard key={r.idMeal} recipe={r} onSave={handleSave} onSelect={() => {}} />
        ))}
      </div>

      <h2>🎲 Feeling Lucky?</h2>
      <button onClick={showRandom}>Show me a random recipe</button>
      {randomRecipe && <RecipeCard recipe={randomRecipe} onSave={handleSave} onSelect={() => {}} />}

      <h2>⭐ Saved Recipes</h2>
      <ul>
        {favorites.map((f) => (
          <li key={f.idMeal}>{f.strMeal}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;