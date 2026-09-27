const express = require("express");
const { createAuthor } = require("../controllers/authorsController");

const router = express.Router();

router.post("/authors", createAuthor);

module.exports = router;
