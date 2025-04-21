import React, { useState } from "react";

/**
 * IngredientInput Component
 * 
 * A controlled input field for entering individual ingredients.
 * On valid input submission (non-empty string), it calls the parent
 * `onAdd()` function and clears the input field.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Function} props.onAdd - Function called with the ingredient string when submitted.
 * @returns {JSX.Element} A JSX form containing an input and button.
 */
const IngredientInput = ({ onAdd }) => {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        placeholder="Type an ingredient..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          if (input.trim()) {
            onAdd(input.trim());
            setInput("");
          }
        }}
      >
        + Add
      </button>
    </div>
  );
};

export default IngredientInput;
