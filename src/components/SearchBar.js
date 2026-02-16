import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search prompt..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ width: "300px", marginBottom: "20px" }}
    />
  );
}

export default SearchBar;