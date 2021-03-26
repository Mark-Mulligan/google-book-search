import React from "react";
import axios from "axios";
import BookInfoDisplay from "../components/BookInfoDisplay";

class SavedPage extends React.Component {
  state = { userBooks: [] };

  getUserBooks = async () => {
    try {
      const { data } = await axios.get(`/api/books/user/${this.props.userId}`);
      console.log(data);
      this.setState({ userBooks: data.data });
    } catch (error) {
      console.log(error);
    }
  };

  onDeleteClick = (index) => {
    console.log("book " + index + " deleted");
  };

  componentDidMount() {
    this.getUserBooks();
  }

  render() {
    return (
      <div className="mt-5 container">
        <h2>Saved Books</h2>

        {this.state.userBooks.length > 0 && this.state.userBooks.map((book, index) => {
          return (
            <BookInfoDisplay
              key={book.googleBookId}
              title={book.title}
              author={book.authors}
              infoLink={book.infoLink}
              description={book.description}
              imageLink={book.imageLink}
              actionBtn="Delete"
              onActionBtnClick={() => this.onDeleteClick(index)}
            />
          );
        })}
      </div>
    );
  }
}

export default SavedPage;
