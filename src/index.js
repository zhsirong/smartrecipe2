/**
 * main.jsx
 *
 * Entry point for the SmartRecipe2 React application.
 * Uses React 18's createRoot API to render the top-level <App /> component
 * into the root DOM element in index.html.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Create the root of the React app and render the main App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
