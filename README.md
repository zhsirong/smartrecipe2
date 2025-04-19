# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
npm run dev
test

**🔧 Code Architecture & Logic Overview**
This section explains the internal logic and component interactions that power SmartRecipe, structured to help graders and developers understand how the app works under the hood.

| Path                             | Responsibility                                                      |
|----------------------------------|----------------------------------------------------------------------|
| `/src/pages/Home.jsx`            | Core logic for search, view toggles, favorites, random recipe        |
| `/src/components/RecipeCard.jsx`| UI card with View/Save actions                                       |
| `/src/components/IngredientInput.jsx` | Add ingredient bar                                               |
| `/src/api/mealdb.js`            | API wrappers for filter and lookup                                   |
| `/src/utils/storage.js`         | LocalStorage utils (prepared but not yet integrated)                 |
| `/public/index.html`, `/vite.config.js` | Vite scaffolding and base for GitHub Pages                   |
| `.github/workflows/deploy.yml`  | GitHub Actions config for deployment                                 |
| `README.md`                     | Final report and instructions (this file)                            |

**🏠 Home.jsx – Central Logic Hub**
**Primary Responsibilities:**
Manages ingredients input, recipe search, saved recipes, and random recipe.
Tracks UI state for toggling recipe details and toast interactions.

**Key State Variables:**
| State Variable     | Description                                                              |
|--------------------|--------------------------------------------------------------------------|
| `ingredients`      | Array of strings representing user-entered ingredients.                 |
| `recipes`          | Filtered recipe results based on ingredient intersection.               |
| `favorites`        | List of user-saved favorite recipes.                                     |
| `randomRecipe`     | One random recipe fetched from API.                                      |
| `expandedId`       | Recipe ID whose details are toggled open in search results.              |
| `savedExpandedId`  | Recipe ID toggled in the favorites list.                                 |
| `expandedDetails`  | A cache to store full recipe details after lookup by ID.                 |


a### **Core Functions:**

- `addIngredient()`: Adds a unique ingredient and triggers new filtering.

- `search()`:
  - Calls `searchRecipesByIngredient()` for each ingredient.
  - Extracts recipe IDs and computes their **intersection**.
  - Final matching IDs are passed to `getRecipeDetailsById()` for full data.

- `toggleSave()`:
  - Adds or removes a recipe from favorites and triggers toast feedback.
  - Prevents duplicates.

- `toggleRecipeDetail()` / `toggleSavedDetail()`:
  - Manages independent detail toggle states for both lists.
  - Loads full recipe data from API if not already cached.

- `showRandom()` / `closeRandom()`:
  - Retrieves one random recipe from MealDB and toggles its display.

- `clearFavorites()`:
  - Clears all saved recipes and triggers a confirmation toast.


 ### 🔍 `RecipeCard.jsx` – Recipe Display Component

- Renders the core recipe card layout.
- Accepts props to control:
  - Toggle behavior
  - Save/unsave state
  - Recipe detail visibility
- When expanded, shows instructions, category, and a close button.


🧂 IngredientInput.jsx – **Input Interface**
Accepts user text input for ingredients.

Calls onAdd() when user submits valid input.

Clears the input field after submission.

### 🌐 `mealdb.js` – API Wrapper Module

All API functions use MealDB's public API:

| Function                            | Purpose                                                  |
|------------------------------------|----------------------------------------------------------|
| `searchRecipesByIngredient()`      | Returns recipes that include a given ingredient (partial data). |
| `getRecipeDetailsById(id)`         | Returns full instructions, category, etc. for a specific recipe. |
| `getRandomRecipe()`                | Returns a random recipe suggestion.                      |

💾 storage.js – **Local Storage (Utility Module)**
Includes functions getFavorites(), saveToFavorites(), and removeFromFavorites().
These are prepared for future integration, but not yet wired into app state.
Allows scaling toward persistent favorites.

 **🧭 App Flow Summary**
User adds ingredients → triggers API searches per ingredient →
→ filters recipes that match all inputs (AND logic) →
→ can expand instructions → save to favorites →
→ toggle favorites independently → optionally view a random suggestion
