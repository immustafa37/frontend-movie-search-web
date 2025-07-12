import React, { useState } from 'react';

const API_KEY = 'a8e27b76'; // ✅ Correct API Key

function SearchBar({ query, setQuery }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 2) {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${val}&page=1`);
      const data = await res.json();
      if (data.Response === 'True') {
        setSuggestions(data.Search.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item) => (
            <li key={item.imdbID} onClick={() => setQuery(item.Title)}>
              {item.Title} ({item.Year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;