import axios from "axios";
import { IMDB_API_KEY } from "../utils/constants";

export const movieById = (movieId) => {
  return axios.get(`https://imdb-api.com/en/API/Title/${IMDB_API_KEY[1]}/${movieId}/Ratings`);
};
