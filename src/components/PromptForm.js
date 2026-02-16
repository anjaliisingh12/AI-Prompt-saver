import React, { useState } from "react";

function PromptForm({ addPrompt }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    addPrompt({
      id: Date.now(),
      text,
      category,
    });

    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter your AI prompt..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        style={{ width: "300px" }}
      />

      <br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option>General</option>
        <option>Coding</option>
        <option>Content</option>
        <option>Interview</option>
      </select>

      <br />

      <button type="submit">Save Prompt</button>
    </form>
  );
}

export default PromptForm;