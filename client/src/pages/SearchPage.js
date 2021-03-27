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
      if (data.book) {
        window.alert('Book already in your saved books.')
      } else {
        window.alert('Book successfuly saved!');
      }
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
          <h1 className="white">Google Books Search</h1>
          <h2 className="white">Search And Save Books of Interest</h2>
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
                    title={book.volumeInfo.title || ''}
                    author={book.volumeInfo.authors || ''}
                    infoLink={book.volumeInfo.infoLink || ''}
                    description={book.volumeInfo.description || ''}
                    imageLink={book.volumeInfo.imageLinks?.thumbnail || ''}
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

export default SearchPage;
