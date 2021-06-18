import fetch from "isomorphic-fetch";

export const getWords = async (number) => {
  try {
    const data = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${number}`
    );
    const result = await data.json();
    var retArr = [];
    for (let x of result) {
      const split = x.split("");
      retArr.push(...split);
      retArr.push(" ");
    }
    return retArr;
  } catch (error) {
    return error;
  }
};
