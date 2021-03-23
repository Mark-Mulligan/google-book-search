import React from "react";

const SearchForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSearchSubmit}>
        <input
          onChange={props.onSearchInputChange}
          value={props.searchTerm}
          className="form-control"
          placeholder="search book title"
        />
      </form>
    </div>
  );
};

export default SearchForm;
