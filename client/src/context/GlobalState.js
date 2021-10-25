import React, { createContext, useReducer } from "react";
import axios from "axios";

import MoviesReducer from "./MoviesReducer";
import { BASE_URL } from "../utils/constants";

export const GlobalContext = createContext();
const initialState = {
  loading: true,
  error: "",
  data: [],
};

export const GlobalProvider = ({ children }) => {
  const [movieState, movieDispatch] = useReducer(MoviesReducer, initialState);

  async function getAllMovies() {
    console.log("Called movies");
    try {
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/movies`);
      movieDispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      movieDispatch({ type: "FETCH_ERROR", payload: err });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        movie: { movies: movieState, movieDispatch, getAllMovies },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
