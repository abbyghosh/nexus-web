import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import axios from "axios";

import useDetectOutside from "../../../customHooks/useDetectOutside";

import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as RubberIcon } from "../../../assets/icons/rubber.svg";
import { ReactComponent as LoadingIcon } from "../../../assets/icons/loading.svg";
import { ReactComponent as TickIcon } from "../../../assets/icons/tick.svg";

import { BASE_URL, IMDB_API_KEY } from "../../../utils/constants";
import { debounce } from "../../../utils";
import { GlobalContext } from "../../../context/GlobalState";

import "./movieSearch.scss";

const MovieSearch = React.forwardRef(({ width }, ref) => {
  let {
    movie: {
      movies: { data: allMovies },
      getAllMovies,
    },
    toast: { toastDispatch },
  } = useContext(GlobalContext);

  const wrapperRef = useRef(null);
  const controller = useRef(null);
  const clickedOutside = useDetectOutside(wrapperRef);

  const [typedMovie, setTypedMovie] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [movieIds, setMovieIds] = useState([]);

  useEffect(() => {
    setSearchedResults([]);
    setErrorMsg("");
  }, [clickedOutside]);

  useEffect(() => {
    setMovieIds(() => allMovies.map((ele) => ele.imDbId));
  }, [allMovies]);

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
          const ignoreSubString = ["(Video)", "(Short)"];
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

  const getMovieById = async (movieId, movie) => {
    let { data: movieRes } = await axios.get(
      `https://imdb-api.com/en/API/Title/${IMDB_API_KEY[1]}/${movieId}/Ratings`
    );

    let body;
    if (!movieRes.ratings) {
      toastDispatch({
        type: "WARNING",
        payload: '"Ratings" is null. Saving data from "Search Results"',
      });
      movieRes = undefined;
      body = {
        image: movie.image,
        genres: null,
        ratings: {
          imDbId: movie.id,
          title: movie.title,
          type: null,
          year: movie.description.substring(1, 5),
          imDb: null,
        },
        detailsFound: false,
      };
    }

    const {
      image,
      genres,
      ratings: { imDbId, title, type, year, imDb },
    } = movieRes || body;

    let movieBody = {
      imDbId,
      image,
      title,
      type,
      year,
      imDb,
      genres: genres ? genres.split(", ") : [],
      watched: false,
      source: "",
      sourceUrl: "",
      watchQueue: 0,
      rewatchScore: 0,
    };

    try {
      await axios.post(`${BASE_URL}/movies`, movieBody);
      getAllMovies();
    } catch (err) {
      console.log("err ", err.response);
      setErrorMsg(err.response.data?.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  };

  const debouncedSearch = useCallback(debounce(searchMovie, 600), []);

  const handleSearchChange = (e) => {
    let value = e.target.value;
    setTypedMovie(value);
    if (value.length > 3) debouncedSearch(e);
    if (!value.trim()) {
      if (controller.current) controller.current.abort();
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
            onClick={() => getMovieById(result.id, result)}
            className="search-results-item"
          >
            <img src={result.image} alt={`${result.title} poster`} width="50" height="50" />
            <div className="content">
              <div className="title">
                <p>{result.title}</p>
                {movieIds.includes(result.id) && <TickIcon width="22" height="22" />}
              </div>
              {result.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MovieSearch;
