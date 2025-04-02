export const searchRecipesByIngredient = async (ingredient) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    return await res.json();
  };
  
  export const getRecipeDetailsById = async (id) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return await res.json();
  };
  
  export const getRandomRecipe = async () => {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    return await res.json();
  };