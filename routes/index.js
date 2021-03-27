const path = require("path");
const router = require("express").Router();
const { saveBook, getUserBooks, deleteBook, getAllBooks } = require('../controllers/books');

// If no API routes are hit, send the React app

router.route("/api/books").get(getAllBooks);
router.route("/api/books").post(saveBook); 
router.route("/api/books").delete(deleteBook);
router.route("/api/books/user/:userId").get(getUserBooks);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;