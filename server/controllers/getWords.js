const fetch = require("isomorphic-fetch");

const getWords = async (req, res) => {
  const { number } = req.body;

  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${number}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = getWords;
