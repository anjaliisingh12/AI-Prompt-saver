import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [prompts, setPrompts] = useState(
    JSON.parse(localStorage.getItem("prompts")) || []
  );
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Latest");
  const [darkMode, setDarkMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("prompts", JSON.stringify(prompts));
  }, [prompts]);

  const handleSave = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updated = [...prompts];
      updated[editIndex] = { text: input, category };
      setPrompts(updated);
      setEditIndex(null);
    } else {
      setPrompts([{ text: input, category }, ...prompts]);
    }

    setInput("");
    setCategory("General");
  };

  const handleDelete = (index) => {
    const updated = prompts.filter((_, i) => i !== index);
    setPrompts(updated);
  };

  const handleEdit = (index) => {
    setInput(prompts[index].text);
    setCategory(prompts[index].category);
    setEditIndex(index);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleClearAll = () => {
    setPrompts([]);
  };

  const filteredPrompts = prompts
    .filter((p) =>
      p.text.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      filterCategory === "All" ? true : p.category === filterCategory
    );

  const sortedPrompts =
    sortOrder === "A-Z"
      ? [...filteredPrompts].sort((a, b) =>
          a.text.localeCompare(b.text)
        )
      : filteredPrompts;

  const mostUsedCategory = () => {
    if (prompts.length === 0) return "None";

    const counts = {};
    prompts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="card">
        <div className="header">
          <h1>AI Prompt Saver 🚀</h1>
          <button
            className="toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search prompt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />

        <div className="row">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input"
          >
            <option>All</option>
            <option>General</option>
            <option>Coding</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="input"
          >
            <option value="Latest">Latest</option>
            <option value="A-Z">A-Z</option>
          </select>
        </div>

        <textarea
          placeholder="Enter your AI prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="textarea"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          <option>General</option>
          <option>Coding</option>
        </select>

        <div className="button-row">
          <button className="save-btn" onClick={handleSave}>
            {editIndex !== null ? "Update Prompt" : "Save Prompt"}
          </button>
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>
        </div>

        <div className="stats">
          <h3>Statistics 📊</h3>
          <p>Total Prompts: {prompts.length}</p>
          <p>Most Used Category: {mostUsedCategory()}</p>
        </div>

        {sortedPrompts.map((p, index) => (
          <div key={index} className="prompt-card">
            <p><strong>Prompt:</strong> {p.text}</p>
            <p><strong>Category:</strong> {p.category}</p>
            <div>
              <button onClick={() => handleCopy(p.text)}>Copy</button>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;