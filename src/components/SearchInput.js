import React from 'react';
import './SearchInput.css';

function SearchInput({ value, onChange, onSubmit, placeholder }) {
  return (
    <form className="search-input" onSubmit={onSubmit}>
      <input
        className="search-input__field"
        type="text"
        placeholder={placeholder || 'Rechercher...'}
        value={value}
        onChange={onChange}
      />
      <button className="search-input__btn" type="submit">
        Rechercher
      </button>
    </form>
  );
}

export default SearchInput;