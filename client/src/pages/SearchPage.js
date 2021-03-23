import React from "react";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import BookInfoDisplay from "../components/BookInfoDisplay";

class SearchPage extends React.Component {
  state = { searchResults: [], searchTerm: "" };

  onSearchSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/books/search", {
      searchTerm: this.state.searchTerm,
    });

    this.setState({ searchResults: response.data.data });
    console.log(response.data.data);
  };

  onSearchInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h1>(React) Google Books Search</h1>
          <h2>Search And Save Books of Interest</h2>
          {this.props.isSignedIn ? (
            <div>User Signed In</div>
          ) : (
            <div>User Not Signed In</div>
          )}
        </div>

        <div className="mt-3">
          <SearchForm
            onSearchSubmit={this.onSearchSubmit}
            searchTerm={this.state.searchTerm}
            onSearchInputChange={this.onSearchInputChange}
          />
        </div>
          {this.state.searchResults && this.state.searchResults.length > 0 && ( 
          <div>
            <div className="mt-4">
              <BookInfoDisplay 
                title={this.state.searchResults[0].volumeInfo.title}
                author={this.state.searchResults[0].volumeInfo.authors}
                infoLink={this.state.searchResults[0].volumeInfo.infoLink}
                description={this.state.searchResults[0].volumeInfo.description}
                imageLink={this.state.searchResults[0].volumeInfo.imageLinks.thumbnail}
              />
            </div>
          </div>
         )}
      </div>
    );
  }
}

/* 
title` - Title of the book from the Google Books API

* `authors` - The books's author(s) as returned from the Google Books API

* `description` - The book's description as returned from the Google Books API

* `image` - The Book's thumbnail image as returned from the Google Books API

* `link`
 <p>{this.state.searchResults[0].volumeInfo.title}</p>
              <p>{this.state.searchResults[0].volumeInfo.authors}</p>
              <p>{this.state.searchResults[0].volumeInfo.description}</p>
              <p>{this.state.searchResults[0].volumeInfo.infoLink}</p>
              <p>
                {this.state.searchResults[0].volumeInfo.imageLinks.thumbnail}
              </p>
*/

export default SearchPage;
