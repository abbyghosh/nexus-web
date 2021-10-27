export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nexusweb.herokuapp.com/api"
    : "http://localhost:4001/api";
export const ORDER_BY = ["", "asc", "desc"];
export const IMDB_API_KEY = ["k_35stsjw8", "k_8b5nf80f"];
