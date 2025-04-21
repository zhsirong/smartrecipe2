/**
 * Fetches recipes from TheMealDB that include a specific ingredient.
 * Uses the filter endpoint, which returns partial data (no instructions).
 *
 * @param {string} ingredient - The ingredient to filter recipes by.
 * @returns {Promise<Object>} A Promise resolving to an object containing a list of meals.
 */
export const searchRecipesByIngredient = async (ingredient) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  return await res.json();
};

/**
 * Fetches full recipe details from TheMealDB based on the recipe ID.
 * Returns complete information such as instructions, category, image, etc.
 *
 * @param {string} id - The unique MealDB recipe ID.
 * @returns {Promise<Object>} A Promise resolving to the full recipe detail object.
 */
export const getRecipeDetailsById = async (id) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  return await res.json();
};

/**
 * Fetches a random recipe from TheMealDB.
 * Useful for generating surprise suggestions.
 *
 * @returns {Promise<Object>} A Promise resolving to one random recipe object.
 */
export const getRandomRecipe = async () => {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  return await res.json();
};
