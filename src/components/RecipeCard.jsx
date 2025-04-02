import React from "react";

const RecipeCard = ({ recipe, onSelect, onSave }) => {
  return (
    <div className="card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <button onClick={() => onSave(recipe)}>♥ Save</button>
      <button onClick={() => onSelect(recipe.idMeal)}>ⓘ View</button>
    </div>
  );
};

export default RecipeCard;