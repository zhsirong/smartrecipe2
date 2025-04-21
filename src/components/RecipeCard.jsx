import React from "react";

/**
 * RecipeCard Component
 *
 * Displays a recipe card with its image, title, save button, view toggle,
 * and (optionally) detailed recipe info including category and instructions.
 * Detail view can be expanded or collapsed. Save status is shown using heart icons.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.recipe - The recipe object containing name, image, ID, etc.
 * @param {boolean} props.isSaved - Whether this recipe is already in favorites
 * @param {Function} props.onToggleSave - Handler to add or remove from favorites
 * @param {Function} props.onToggleDetail - Handler to toggle detail view (search section)
 * @param {Object|null} props.detail - Full detail of the recipe if already fetched
 * @param {boolean} props.isExpanded - Whether this card's details are currently shown
 * @param {Function} props.onCloseDetail - Handler to close the detail section
 * @returns {JSX.Element} A rendered recipe card
 */
const RecipeCard = ({
  recipe,
  isSaved,
  onToggleSave,
  onToggleDetail,
  detail,
  isExpanded,
  onCloseDetail
}) => {
  return (
    <div className="card" style={{ marginBottom: "2em" }}>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: "100%", maxWidth: "300px", height: "auto", borderRadius: "8px" }}
      />

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
