import axios from "axios";

const devUrl = "http://localhost:4001/api";
const prodUrl = "/api"; // "https://nexusweb.herokuapp.com/api"

export default axios.create({
  baseURL: process.env.NODE_ENV === "production" ? prodUrl : devUrl,
});
