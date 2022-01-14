import React, { createContext, useEffect, useReducer, useState } from "react";

import axiosConfig from "../axiosConfig";

import MoviesReducer from "./MoviesReducer";
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
  const [scrollByValue, setScrollByValue] = useState(null);
  const [movieCurrentPage, setMovieCurrentPage] = useState(1);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    setUserDetails(user ? JSON.parse(user) : {});
  }, []);

  async function getAllMovies() {
    try {
      const {
        data: { data },
      } = await axiosConfig.get(`/movies`);
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
        scrollBy: { scrollByValue, setScrollByValue },
        pagination: { movieCurrentPage, setMovieCurrentPage },
        users: { userDetails, setUserDetails },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
