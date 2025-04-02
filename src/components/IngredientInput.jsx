import React, { useState } from "react";

const IngredientInput = ({ onAdd }) => {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        placeholder="Type an ingredient..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => {
        if (input.trim()) {
          onAdd(input.trim());
          setInput("");
        }
      }}>+ Add</button>
    </div>
  );
};

export default IngredientInput;