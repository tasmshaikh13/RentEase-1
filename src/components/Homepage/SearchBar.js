import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length > 0) {
      const filtered = categories.filter((category) =>
        category.label.toLowerCase().includes(term)
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  const handleSelectCategory = (category) => {
    navigate(`/category/${category.label.toLowerCase()}`);
    setSearchTerm(""); // Reset search input
    setFilteredResults([]); // Hide suggestions
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {filteredResults.length > 0 && (
        <ul className="search-results">
          {filteredResults.map((category, index) => (
            <li key={index} onClick={() => handleSelectCategory(category)}>
              {category.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
