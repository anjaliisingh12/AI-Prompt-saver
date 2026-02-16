import React, { useState } from "react";

function PromptList({
  prompts,
  deletePrompt,
  updatePrompt,
  editingId,
  setEditingId,
}) {
  const [editText, setEditText] = useState("");
  const [editCategory, setEditCategory] = useState("General");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Prompt copied!");
  };

  const startEditing = (prompt) => {
    setEditingId(prompt.id);
    setEditText(prompt.text);
    setEditCategory(prompt.category);
  };

  const saveEdit = (id) => {
    updatePrompt(id, editText, editCategory);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {prompts.map((prompt) => (
        <div
          key={prompt.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
          }}
        >
          {editingId === prompt.id ? (
            <>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows="3"
                style={{ width: "100%" }}
              />

              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option>General</option>
                <option>Coding</option>
                <option>Content</option>
                <option>Interview</option>
              </select>

              <br />

              <button onClick={() => saveEdit(prompt.id)}>
                Save
              </button>

              <button
                onClick={() => setEditingId(null)}
                style={{ marginLeft: "5px" }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Prompt:</strong> {prompt.text}
              </p>
              <p>
                <strong>Category:</strong> {prompt.category}
              </p>

              <button
                onClick={() => copyToClipboard(prompt.text)}
                style={{ marginRight: "5px" }}
              >
                Copy
              </button>

              <button
                onClick={() => startEditing(prompt)}
                style={{ marginRight: "5px" }}
              >
                Edit
              </button>

              <button onClick={() => deletePrompt(prompt.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PromptList;