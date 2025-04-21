/**
 * Saves a recipe to the "favorites" list in localStorage.
 * Appends the new recipe to the existing list.
 *
 * @param {Object} recipe - The recipe object to add to favorites.
 */
export const saveToFavorites = (recipe) => {
  const existing = JSON.parse(localStorage.getItem("favorites")) || [];
  const updated = [...existing, recipe];
  localStorage.setItem("favorites", JSON.stringify(updated));
};

/**
 * Removes a recipe from the "favorites" list in localStorage.
 *
 * @param {string} id - The idMeal value of the recipe to remove.
 */
export const removeFromFavorites = (id) => {
  const existing = JSON.parse(localStorage.getItem("favorites")) || [];
  const updated = existing.filter((item) => item.idMeal !== id);
  localStorage.setItem("favorites", JSON.stringify(updated));
};

/**
 * Retrieves the full list of saved favorite recipes from localStorage.
 *
 * @returns {Object[]} An array of saved recipe objects, or an empty array if none exist.
 */
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};
