const express = require("express");
const {
  createBook,
  getBooks,
  updateBook,
  deleteBook
} = require("../controllers/booksController");

const router = express.Router();

router.post("/books", createBook);
router.get("/books", getBooks);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
