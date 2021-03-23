import React, { useState } from "react";
import axios from "axios";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/books/search", {
      searchTerm: searchTerm,
    });

    console.log(response.data);
  };

  return (
    <div className="container">
      <form onSubmit={onSearchSubmit}>
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="form-control"
          placeholder="search book title"
        />
      </form>
    </div>
  );
};

export default SearchForm;
