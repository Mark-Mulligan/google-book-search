const Book = require("../models/Book");

exports.saveBook = async (req, res) => {
  const {
    googleBookId,
    title,
    authors,
    description,
    imageLink,
    infoLink,
    userId,
  } = req.body;

  const foundBook = await Book.find({ googleBookId, userId });

  if (foundBook.length > 0) {
    console.log('found book ran');
    res.status(200).json({ book: 'already saved' });
  } else {
    console.log('create new book to save')
    const book = new Book({
      googleBookId,
      title,
      authors,
      description,
      imageLink,
      infoLink,
      userId,
    });

    try {
      const savedBook = await book.save();
      res.status(200).json({ success: true, data: savedBook });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, data: "Book was not saved.  Try again" });
    }
  }
};

exports.getUserBooks = async (req, res) => {
  const { userId } = req.params;

  try {
    const foundBooks = await Book.find({ userId: userId });
    res.status(200).json({ success: true, data: foundBooks });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        data: "There was an error retreving the users books.",
      });
  }
};

exports.deleteBook = async (req, res) => {
  const { bookid, userid } = req.query;

  try {
    const deletedBook = await Book.deleteOne({
      googleBookId: bookid,
      userId: userid,
    });
    res.status(200).json({ success: true, data: deletedBook });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, data: "There was an error deleting the book" });
  }
};
