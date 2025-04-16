import React, { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeCard from "../components/RecipeCard";
import {
  searchRecipesByIngredient,
  getRandomRecipe,
  getRecipeDetailsById,
} from "../api/mealdb";
import { getFavorites } from "../utils/storage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [favorites, setFavorites] = useState(getFavorites());

  const [expandedId, setExpandedId] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState({});

  const addIngredient = (ing) => {
    if (!ingredients.includes(ing)) {
      const updated = [...ingredients, ing];
      setIngredients(updated);
      search(updated);
    }
  };

  const removeIngredient = (idx) => {
    const updated = ingredients.filter((_, i) => i !== idx);
    setIngredients(updated);
    search(updated);
  };

  const search = async (ingredientList = ingredients) => {
    if (ingredientList.length === 0) {
      setRecipes([]);
      return;
    }

    const allResults = await Promise.all(
      ingredientList.map((ing) => searchRecipesByIngredient(ing))
    );

    const sets = allResults.map((res) =>
      new Set((res.meals || []).map((meal) => meal.idMeal))
    );

    const commonIds = sets.reduce((a, b) => new Set([...a].filter((x) => b.has(x))));

    const intersectedRecipes = (allResults[0].meals || []).filter((meal) =>
      commonIds.has(meal.idMeal)
    );

    setRecipes(intersectedRecipes);
  };

  const toggleSave = (recipe) => {
    const isAlreadySaved = favorites.some((f) => f.idMeal === recipe.idMeal);
    if (isAlreadySaved) {
      const updated = favorites.filter((f) => f.idMeal !== recipe.idMeal);
      setFavorites(updated);
      toast.info(`Removed from favorites: ${recipe.strMeal}`);
    } else {
      setFavorites((prev) => [...prev.filter(f => f.idMeal !== recipe.idMeal), recipe]);
      toast.success(`Added to favorites: ${recipe.strMeal}`);
    }
  };

  const isRecipeSaved = (idMeal) =>
    favorites.some((f) => f.idMeal === idMeal);

  const toggleRecipeDetail = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      if (!expandedDetails[id]) {
        const res = await getRecipeDetailsById(id);
        setExpandedDetails((prev) => ({
          ...prev,
          [id]: res.meals[0],
        }));
      }
      setExpandedId(id);
    }
  };

  const closeDetail = () => {
    setExpandedId(null);
  };

  const showRandom = async () => {
    const res = await getRandomRecipe();
    const meal = res.meals[0];
    setRandomRecipe(meal);
    setExpandedId(null);
  };

  const closeRandom = () => {
    setRandomRecipe(null);
    setExpandedId(null);
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.info("Cleared all saved recipes.");
  };

  return (
    <div>
      <h1>🍳 Smart Recipe Assistant</h1>

      <IngredientInput onAdd={addIngredient} />
      <div style={{ marginBottom: "1em" }}>
        <strong>Selected:</strong>
        {ingredients.map((ingredient, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.3em 0.5em",
              margin: "0 0.3em",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
            }}
          >
            {ingredient}
            <button
              style={{
                background: "none",
                border: "none",
                marginLeft: "4px",
                cursor: "pointer",
                fontSize: "1em",
              }}
              onClick={() => removeIngredient(idx)}
            >
              ❌
            </button>
          </span>
        ))}
      </div>

      {/* 🥗 Recipes Section */}
      <h2>🥗 Recipes</h2>
      <div className="recipes">
        {recipes.map((r) => (
          <RecipeCard
            key={r.idMeal}
            recipe={r}
            isSaved={isRecipeSaved(r.idMeal)}
            onToggleSave={toggleSave}
            onToggleDetail={toggleRecipeDetail}
            onCloseDetail={closeDetail}
            detail={expandedDetails[r.idMeal]}
            isExpanded={expandedId === r.idMeal}
          />
        ))}
      </div>

      {/* 🎲 Random Recipe Section */}
      <h2>🎲 Feeling Lucky?</h2>
      <button onClick={showRandom}>Show me a random recipe</button>
      {randomRecipe && (
        <div>
          <div style={{ marginTop: "1em", display: "flex", gap: "1em", alignItems: "center" }}>
            <button onClick={closeRandom}>❌ Close</button>
            <button onClick={showRandom}>🔄 Refresh</button>
          </div>
          <RecipeCard
            recipe={randomRecipe}
            isSaved={isRecipeSaved(randomRecipe.idMeal)}
            onToggleSave={toggleSave}
            onToggleDetail={toggleRecipeDetail}
            onCloseDetail={closeDetail}
            detail={expandedDetails[randomRecipe.idMeal]}
            isExpanded={expandedId === randomRecipe.idMeal}
          />
        </div>
      )}

      {/* ⭐ Saved Recipes */}
      <h2>⭐ Saved Recipes</h2>
      <button
        onClick={clearFavorites}
        style={{
          marginBottom: "1em",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        🗑️ Clear All
      </button>
      <ul>
        {favorites.map((f, idx) => (
          <li key={`${f.idMeal}-${idx}`}>
            <button
              onClick={() => toggleRecipeDetail(f.idMeal)}
              style={{
                all: "unset",
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {f.strMeal}
            </button>
            {expandedId === f.idMeal && expandedDetails[f.idMeal] && (
              <div className="details" style={{
                marginTop: "0.5em",
                backgroundColor: "#f3f3f3",
                padding: "0.5em",
                border: "1px solid #ccc",
                position: "relative",
                borderRadius: "5px"
              }}>
                <button
                  onClick={closeDetail}
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "8px",
                    background: "none",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
                <img
                  src={expandedDetails[f.idMeal].strMealThumb}
                  alt={f.strMeal}
                  style={{ width: "200px" }}
                />
                <p><strong>Category:</strong> {expandedDetails[f.idMeal].strCategory}</p>
                <p><strong>Instructions:</strong> {expandedDetails[f.idMeal].strInstructions}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Home;
