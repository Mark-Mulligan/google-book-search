import React from "react";
import axios from "axios";
import BookInfoDisplay from "../components/BookInfoDisplay";

class SavedPage extends React.Component {
  state = { userBooks: [], apiCalled: false };

  getUserBooks = async () => {
    try {
      const { data } = await axios.get(`/api/books/user/${this.props.userId}`);
      console.log(data);
      this.setState({ userBooks: data.data });
    } catch (error) {
      console.log(error);
    }
  };

  deleteBook = async (bookId, userId) => {
    try {
      const { data } = await axios.delete(`/api/books?bookid=${bookId}&userid=${userId}`);
      if (data.success) {
        this.getUserBooks();
      }
    } catch (error) {
      console.log(error);
    }
  }

  onDeleteClick = (index) => {
    const bookId = this.state.userBooks[index].googleBookId;
    const userId = this.props.userId;
    this.deleteBook(bookId, userId);
  };

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.getUserBooks();
      this.setState({ apiCalled: true });
    } 
  }

  componentDidUpdate() {
    if (this.props.isSignedIn === false) {
      this.props.history.push("/");
    }else if (this.props.userId && !this.state.apiCalled) {
      this.getUserBooks();
      this.setState({ apiCalled: true });
    }
  }


  render() {
    return (
      <div className="mt-5 container">
        <h2>Saved Books</h2>
        {this.props.isSignedIn ? (
            <div>User Signed In</div>
          ) : (
            <div>User Not Signed In</div>
          )}
          {this.props.userId}

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
