import React from "react";

const RecipeCard = ({
  recipe,
  isSaved,
  onToggleSave,
  onToggleDetail,
  detail,
  isExpanded,
  onCloseDetail,
}) => {
  return (
    <div className="card" style={{ marginBottom: "2em" }}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>

      <button onClick={() => onToggleSave(recipe)}>
        {isSaved ? "❤️" : "♡"} Save
      </button>

      <button onClick={() => onToggleDetail(recipe.idMeal)}>
        ⓘ View
      </button>

      {isExpanded && detail && (
        <div
          className="details"
          style={{
            border: "1px solid #ccc",
            marginTop: "0.5em",
            padding: "0.5em",
            borderRadius: "5px",
            position: "relative",
            backgroundColor: "#f9f9f9",
          }}
        >
          <button
            onClick={onCloseDetail}
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
          <p><strong>Category:</strong> {detail.strCategory}</p>
          <p><strong>Instructions:</strong> {detail.strInstructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;

