import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import axios from "axios";

import useDetectOutside from "../../../customHooks/useDetectOutside";

import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as RubberIcon } from "../../../assets/icons/rubber.svg";
import { ReactComponent as LoadingIcon } from "../../../assets/icons/loading.svg";

import { BASE_URL, IMDB_API_KEY } from "../../../utils/constants";
import { debounce } from "../../../utils";
import { GlobalContext } from "../../../context/GlobalState";

import "./movieSearch.scss";

const MovieSearch = React.forwardRef(({ width }, ref) => {
  const ignoreSubString = ["(Video)", "(Short)"];
  let {
    movie: { getAllMovies },
    toast: { toastDispatch },
  } = useContext(GlobalContext);

  const wrapperRef = useRef(null);
  const controller = useRef(null);
  const clickedOutside = useDetectOutside(wrapperRef);

  const [typedMovie, setTypedMovie] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    setSearchedResults([]);
    setErrorMsg("");
  }, [clickedOutside]);

  const searchMovie = async (e) => {
    e?.preventDefault();
    const searchText = e?.target?.value || typedMovie;

    if (searchText.trim()) {
      if (controller.current) controller.current.abort();
      controller.current = new AbortController();
      try {
        setLoadingMovies(true);
        let {
          data: { results: moviesIdRes, errorMessage },
        } = await axios.get(`https://imdb-api.com/en/API/Search/${IMDB_API_KEY[0]}/${searchText}`, {
          signal: controller.current.signal,
        });

        setLoadingMovies(false);
        if (errorMessage) {
          toastDispatch({ type: "ERROR", payload: errorMessage });
        } else if (!moviesIdRes.length) {
          toastDispatch({ type: "ERROR", payload: "No search result." });
          setSearchedResults([]);
        } else {
          const filteredMoviesOnly = moviesIdRes?.filter(
            (data) => !ignoreSubString.some((r) => data.description.includes(r))
          );
          filteredMoviesOnly.sort(function (a, b) {
            let aTemp = Number(a.description.substring(1, 5));
            let bTemp = Number(b.description.substring(1, 5));

            return bTemp - aTemp;
          });

          setSearchedResults(filteredMoviesOnly);
        }
      } catch (err) {
        if (err.name === "AbortError") console.log("previous api call cancelled");
        else {
          console.log(err);
          setLoadingMovies(false);
        }
      }
    }
  };

  const getMovieById = async (movieId) => {
    const { data: movieRes } = await axios.get(
      `https://imdb-api.com/en/API/Title/${IMDB_API_KEY[1]}/${movieId}/Ratings`
    );
    const {
      image,
      genres,
      ratings: { imDbId, title, type, year, imDb },
    } = movieRes;

    let movieBody = {
      imDbId,
      image,
      title,
      type,
      year,
      imDb,
      genres: genres.split(", "),
      watched: false,
      source: "",
      sourceUrl: "",
      watchQueue: 0,
      rewatchScore: 0,
    };

    try {
      await axios.post(`${BASE_URL}/movies`, movieBody);
      toastDispatch({ type: "SUCCESS", payload: "Movie Added" });
      getAllMovies();
    } catch (err) {
      console.log("err ", err.response);
      setErrorMsg(err.response.data?.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  const debouncedSearch = useCallback(debounce(searchMovie, 600), []);

  const handleSearchChange = (e) => {
    let value = e.target.value;
    setTypedMovie(value);
    if (value.length > 3) debouncedSearch(e);
    if (!value.trim()) {
      if (controller) controller.current.abort();
      setSearchedResults([]);
    }
  };

  return (
    <div className="search-container" ref={wrapperRef} style={{ width: width }}>
      <form onSubmit={searchMovie} className="search-field search-width">
        <input
          type="text"
          value={typedMovie}
          onChange={handleSearchChange}
          placeholder="Search movie or web series"
          ref={ref}
        />
        <div>
          {loadingMovies && <LoadingIcon width="22" height="22" />}

          <button type="submit">
            {typedMovie && (
              <RubberIcon
                width="22"
                height="22"
                onClick={() => {
                  setTypedMovie("");
                  setSearchedResults([]);
                }}
              />
            )}
          </button>
          <button type="submit">
            <SearchIcon width="24" height="24" />
          </button>
        </div>
      </form>

      <div
        className={`search-results search-width${
          searchedResults.length ? " search-results-open" : " search-results-close"
        }`}
      >
        {errorMsg && <div className="error-msg">{errorMsg}</div>}
        {searchedResults.map((result) => (
          <div
            key={result.id}
            onClick={() => getMovieById(result.id)}
            className="search-results-item"
          >
            <img src={result.image} alt={`${result.title} poster`} width="50" height="50" />
            <div>
              {result.title}
              <br />
              {result.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MovieSearch;
