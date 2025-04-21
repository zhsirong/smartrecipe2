// ## This function takes a user-provided ingredient and fetches recipes that include it.
export const searchRecipesByIngredient = async (ingredient) => {
  // ## Uses TheMealDB's filter endpoint to search for meals with the given ingredient.
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  // ## Parses and returns the response JSON containing a list of matching meals.
  return await res.json();
};

// ## This function fetches full details for a recipe using its unique MealDB ID.
export const getRecipeDetailsById = async (id) => {
  // ## Calls the lookup endpoint to retrieve the full recipe (ingredients, instructions, etc.).
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  // ## Parses and returns the recipe’s detailed information as a JSON object.
  return await res.json();
};

// ## This function fetches a completely random recipe from TheMealDB.
export const getRandomRecipe = async () => {
  // ## Calls the random recipe endpoint to get a surprise meal suggestion.
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  // ## Returns the random recipe in JSON format.
  return await res.json();
};
// ## This function fetches a list of all available categories from TheMealDB.