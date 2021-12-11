import React, { createContext, useReducer } from "react";
import axios from "axios";

import MoviesReducer from "./MoviesReducer";
import { BASE_URL } from "../utils/constants";
import ToastReducer from "./ToastReducer";

export const GlobalContext = createContext();
const initialState = {
  loading: true,
  error: "",
  data: [],
};

const initialToastState = {
  isActive: false,
  msg: "",
  severity: "", //success, error, warning, info
};

export const GlobalProvider = ({ children }) => {
  const [movieState, movieDispatch] = useReducer(MoviesReducer, initialState);
  const [toastState, toastDispatch] = useReducer(ToastReducer, initialToastState);

  async function getAllMovies() {
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
        toast: { toastState, toastDispatch },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
