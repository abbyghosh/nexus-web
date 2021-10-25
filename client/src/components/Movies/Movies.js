import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import MovieCard from "./MovieCard/MovieCard";
import MovieTable from "./MovieTable/MovieTable";

import { ReactComponent as TableIcon } from "../../assets/icons/table.svg";
import { ReactComponent as WatchedIcon } from "../../assets/icons/watched.svg";
import { ReactComponent as NotWatchedIcon } from "../../assets/icons/not-watched.svg";

import { BASE_URL } from "../../utils/constants";

import "./movies.scss";
import { GlobalContext } from "../../context/GlobalState";

function Main() {
  let {
    movie: {
      movies: { loading, error, data: allMovies },
      getAllMovies,
    },
  } = useContext(GlobalContext);

  const [isTableView, setIsTableView] = useState(true);
  const [displayWatched, setDisplayWatched] = useState(false);
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    getAllMovies();
    getAllSources();
  }, []);

  /*   const getAllMovies = async () => {
    let {
      data: { data },
    } = await axios.get(`${BASE_URL}/movies`);
    console.log("all movies ", data);
    setAllMovies(data);
    setRefreshMovies(false);
  }; */

  const getAllSources = async () => {
    let {
      data: { data },
    } = await axios.get(`${BASE_URL}/sources`);
    setSourceList(data);
  };

  return (
    <main className="movies-container">
      <div>
        <div onClick={getAllMovies}>Refresh</div>
        <div>
          {displayWatched ? (
            <WatchedIcon onClick={() => setDisplayWatched((prev) => !prev)} />
          ) : (
            <NotWatchedIcon onClick={() => setDisplayWatched((prev) => !prev)} />
          )}
        </div>
        <div
          className={isTableView ? null : "no-table-view"}
          onClick={() => setIsTableView((prev) => !prev)}
        >
          <TableIcon width="20" />
        </div>
      </div>

      <div className="main-wrapper">
        {isTableView ? (
          <MovieTable
            allMovies={allMovies}
            sourceList={sourceList}
            displayWatched={displayWatched}
            getAllMovies={getAllMovies}
          />
        ) : (
          <MovieCard allMovies={allMovies} getAllMovies={getAllMovies} />
        )}
      </div>
    </main>
  );
}

export default Main;
