/**
 * main.jsx
 *
 * Root entry point for the SmartRecipe2 application.
 * Sets up React's strict rendering mode and mounts the <App /> component to the DOM.
 * Also imports global styles via index.css.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Mount the root React app to the DOM using React 18's createRoot API
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
