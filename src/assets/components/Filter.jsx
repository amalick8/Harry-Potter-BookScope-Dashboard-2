import React from "react";

function Filter({ setSelectedDecade }) {
  return (
    <select
      className="filter-dropdown"
      onChange={(e) => setSelectedDecade(e.target.value)}
    >
      <option value="All">All Decades</option>
      <option value="1990">1990s</option>
      <option value="2000">2000s</option>
      <option value="2010">2010s</option>
      <option value="2020">2020s</option>
    </select>
  );
}

export default Filter;
