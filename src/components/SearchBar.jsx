import React from 'react';
import '../styles/search.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input placeholder="¿Qué buscas?" />
      <button type="submit">Buscar</button>
    </div>
  );
}

export default SearchBar;