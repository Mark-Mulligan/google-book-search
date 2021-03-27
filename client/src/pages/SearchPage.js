import React from "react";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import BookInfoDisplay from "../components/BookInfoDisplay";

class SearchPage extends React.Component {
  state = { searchResults: [], searchTerm: "" };

  onSaveClick = async (index) => {
    const clickedBook = this.state.searchResults[index];

    try {
      const { data } = await axios.post("/api/books", {
        googleBookId: clickedBook.id,
        title: clickedBook.volumeInfo.title,
        authors: clickedBook.volumeInfo.authors,
        description: clickedBook.volumeInfo.description,
        imageLink: clickedBook.volumeInfo.imageLinks.thumbnail,
        infoLink: clickedBook.volumeInfo.infoLink,
        userId: this.props.userId
      })
      console.log(data);
      window.alert('Book successfuly saved!');
    } catch(error) {
      console.log(error);
    }
  };

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

  componentDidUpdate() {
    if (this.props.isSignedIn === false) {
      this.props.history.push("/");
    }
  }

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
          {this.props.userId}
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
              {this.state.searchResults.map((book, index) => {
                return (
                  <BookInfoDisplay
                    key={book.id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors}
                    infoLink={book.volumeInfo.infoLink}
                    description={book.volumeInfo.description}
                    imageLink={book.volumeInfo.imageLinks.thumbnail}
                    actionBtn="Save"
                    onActionBtnClick={() => this.onSaveClick(index)}
                  />
                );
              })}
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
