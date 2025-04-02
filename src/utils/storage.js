export const saveToFavorites = (recipe) => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = [...existing, recipe];
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
  
  export const removeFromFavorites = (id) => {
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = existing.filter((item) => item.idMeal !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
  
  export const getFavorites = () => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  };