const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  googleBookId: String,
  title: String,
  authors: Array,
  description: String,
  imageLink: String,
  infoLink: String,
  userId: String,
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
