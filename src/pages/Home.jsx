/**
 * Home.jsx
 * 
 * Main logic hub for the SmartRecipe2 application.
 * 
 * Handles ingredient input, recipe filtering (AND logic), favorites management,
 * random recipe generation, and UI state for toggling recipe detail views.
 * Uses TheMealDB API and localStorage for data handling.
 */

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

/**
 * Home component – top-level container for app logic and UI.
 *
 * @returns {JSX.Element} The full recipe application UI.
 */
const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [favorites, setFavorites] = useState(getFavorites());

  const [expandedId, setExpandedId] = useState(null); // For recipe list
  const [savedExpandedId, setSavedExpandedId] = useState(null); // For favorites list
  const [expandedDetails, setExpandedDetails] = useState({}); // Cached recipe detail data

  /**
   * Adds a new ingredient to the list and triggers recipe search.
   * Ignores duplicates.
   * 
   * @param {string} ing - Ingredient entered by the user.
   */
  const addIngredient = (ing) => {
    if (!ingredients.includes(ing)) {
      const updated = [...ingredients, ing];
      setIngredients(updated);
      search(updated);
    }
  };

  /**
   * Removes an ingredient by index and updates the recipe results.
   *
   * @param {number} idx - Index of the ingredient to remove.
   */
  const removeIngredient = (idx) => {
    const updated = ingredients.filter((_, i) => i !== idx);
    setIngredients(updated);
    search(updated);
  };

  /**
   * Fetches recipes that contain *all* selected ingredients.
   * Uses AND logic by intersecting sets of recipe IDs.
   *
   * @param {string[]} ingredientList - Optional override list (defaults to current state).
   */
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

  /**
   * Toggles a recipe in or out of the favorites list.
   * Uses ID to avoid duplicates. Triggers a toast.
   *
   * @param {Object} recipe - The recipe to save or remove.
   */
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

  /**
   * Checks whether a recipe is currently saved.
   *
   * @param {string} idMeal - The recipe ID to check.
   * @returns {boolean} True if saved, false otherwise.
   */
  const isRecipeSaved = (idMeal) =>
    favorites.some((f) => f.idMeal === idMeal);

  /**
   * Expands or collapses recipe detail view from the main list.
   * Fetches detail from API if not already cached.
   *
   * @param {string} id - MealDB ID of the recipe.
   */
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
      setSavedExpandedId(null);
    }
  };

  /**
   * Expands or collapses recipe detail view from the favorites list.
   * Fetches detail from API if not already cached.
   *
   * @param {string} id - MealDB ID of the recipe.
   */
  const toggleSavedDetail = async (id) => {
    if (savedExpandedId === id) {
      setSavedExpandedId(null);
    } else {
      if (!expandedDetails[id]) {
        const res = await getRecipeDetailsById(id);
        setExpandedDetails((prev) => ({
          ...prev,
          [id]: res.meals[0],
        }));
      }
      setSavedExpandedId(id);
    }
  };

  /**
   * Fetches a random recipe from the API and displays it.
   */
  const showRandom = async () => {
    const res = await getRandomRecipe();
    const meal = res.meals[0];
    setRandomRecipe(meal);
    setExpandedId(null);
  };

  /**
   * Closes the currently displayed random recipe.
   */
  const closeRandom = () => {
    setRandomRecipe(null);
    setExpandedId(null);
  };

  /**
   * Clears all saved favorite recipes from state.
   */
  const clearFavorites = () => {
    setFavorites([]);
    toast.info("Cleared all saved recipes.");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1em" }}>
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

      <h2>🥗 Recipes</h2>
      <div className="recipes">
        {recipes.map((r) => (
          <RecipeCard
            key={r.idMeal}
            recipe={r}
            isSaved={isRecipeSaved(r.idMeal)}
            onToggleSave={toggleSave}
            onToggleDetail={toggleRecipeDetail}
            onCloseDetail={() => setExpandedId(null)}
            detail={expandedDetails[r.idMeal]}
            isExpanded={expandedId === r.idMeal}
          />
        ))}
      </div>

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
            onCloseDetail={() => setExpandedId(null)}
            detail={expandedDetails[randomRecipe.idMeal]}
            isExpanded={expandedId === randomRecipe.idMeal}
          />
        </div>
      )}

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
              onClick={() => toggleSavedDetail(f.idMeal)}
              style={{
                all: "unset",
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {f.strMeal}
            </button>
            {savedExpandedId === f.idMeal && expandedDetails[f.idMeal] && (
              <div className="details" style={{
                marginTop: "0.5em",
                backgroundColor: "#f3f3f3",
                padding: "0.5em",
                border: "1px solid #ccc",
                position: "relative",
                borderRadius: "5px"
              }}>
                <button
                  onClick={() => setSavedExpandedId(null)}
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
