import React from "react";

function SearchBar({ setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="Search by title or author..."
      className="search-bar"
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default SearchBar;
