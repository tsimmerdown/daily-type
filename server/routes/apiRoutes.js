const express = require("express");
const getWords = require("../controllers/getWords");

const router = express.Router();

router.post("/words", getWords);

module.exports = router;
