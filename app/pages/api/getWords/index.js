import fetch from "isomorphic-fetch";

export const getWords = async (number) => {
  try {
    const data = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${number}`
    );
    const result = await data.json();
    return result;
  } catch (error) {
    return error;
  }
};
