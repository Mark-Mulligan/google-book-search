import React from "react";

const SearchForm = (props) => {
  return (
    <div style={{maxWidth: '500px', margin: 'auto'}}>
      <form onSubmit={props.onSearchSubmit}>
        <input
          onChange={props.onSearchInputChange}
          value={props.searchTerm}
          className="form-control"
          placeholder="search book title"
        />
        <div className="text-center mt-2">
          <button type="submit" className="btn btn-block btn-dark">Search</button>
        </div>
        
      </form>
    </div>
  );
};

export default SearchForm;
