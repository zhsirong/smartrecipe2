/**
 * App.jsx
 *
 * Top-level component for SmartRecipe2.
 * Currently acts as a wrapper that renders the main <Home /> page.
 * In a larger app, this could include routing, layout, or global providers.
 */

import React from "react";
import Home from "./pages/Home";

/**
 * Renders the <Home /> component.
 *
 * @returns {JSX.Element} The main UI of the app.
 */
function App() {
  return <Home />;
}

export default App;
