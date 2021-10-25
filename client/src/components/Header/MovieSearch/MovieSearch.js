import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import useDetectOutside from "../../../customHooks/useDetectOutside";

import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";

import { BASE_URL, IMDB_API_KEY } from "../../../utils/constants";

import "./movieSearch.scss";
import { GlobalContext } from "../../../context/GlobalState";

function MovieSearch() {
  const ignoreSubString = ["(Video)", "(Short)"];
  let {
    movie: { getAllMovies },
  } = useContext(GlobalContext);

  const wrapperRef = useRef(null);
  const clickedOutside = useDetectOutside(wrapperRef);

  const [typedMovie, setTypedMovie] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setSearchedResults([]);
    setErrorMsg("");
  }, [clickedOutside]);

  const searchMovie = async (e) => {
    e.preventDefault();
    if (typedMovie.trim()) {
      let {
        data: { results: moviesIdRes },
      } = await axios.get(`https://imdb-api.com/en/API/Search/${IMDB_API_KEY[0]}/${typedMovie}`);

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
      getAllMovies();
    } catch (err) {
      console.log("err ", err.response);
      setErrorMsg(err.response.data?.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  return (
    <div className="search-container" ref={wrapperRef}>
      <form onSubmit={searchMovie} className="search-field">
        <input
          type="text"
          value={typedMovie}
          onChange={(e) => setTypedMovie(e.target.value)}
          placeholder="Search movie or web series"
        />
        <button type="submit">
          <SearchIcon width="20" height="20" />
        </button>
      </form>

      <div
        className={`search-results${
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
}

export default MovieSearch;
