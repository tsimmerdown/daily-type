const fetch = require("isomorphic-fetch");

const getWords = async (req, res) => {
  const { number } = req.body;

  try {
    const data = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${number}`
    );
    const result = await data.json();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getWords;
