import axios from "axios";

const API = axios.create(
  process.env.NODE_ENV === "development"
    ? { baseURL: "http://localhost:3080" }
    : { baseURL: "https://daily-type-server.herokuapp.com" }
);

export const getWords = (number) => {
  return API.post(`/api/words`, { number: number });
};
