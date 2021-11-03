import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import MovieCard from "./MovieCard/MovieCard";
import MovieTable from "./MovieTable/MovieTable";

import { ReactComponent as TableIcon } from "../../assets/icons/table.svg";
import { ReactComponent as WatchedIcon } from "../../assets/icons/watched.svg";
import { ReactComponent as NotWatchedIcon } from "../../assets/icons/not-watched.svg";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";

import { BASE_URL, ORDER_BY } from "../../utils/constants";

import "./movies.scss";
import { GlobalContext } from "../../context/GlobalState";
import useDevice from "../../customHooks/useDevice";

function Main() {
  const { isMobile } = useDevice();

  let {
    movie: {
      movies: { loading, error, data: allMovies },
      getAllMovies,
    },
  } = useContext(GlobalContext);

  const [isTableView, setIsTableView] = useState(true);
  const [displayWatched, setDisplayWatched] = useState(false);
  const [sourceList, setSourceList] = useState([]);

  const [editId, setEditId] = useState(null);
  const [updateBody, setUpdateBody] = useState({});

  const [sortBy, setSortBy] = useState({ name: "", order: 0 });

  useEffect(() => {
    if (isMobile) setIsTableView(false);
  }, [isMobile]);

  useEffect(() => {
    setSortBy({ name: "", order: 0 });
  }, [displayWatched]);

  useEffect(() => {
    getAllMovies();
    getAllSources();
  }, []);

  const getSortedMovies = () => {
    let movies = [...allMovies];
    if (sortBy.order > 0)
      return movies.sort(function (a, b) {
        if (ORDER_BY[sortBy.order] === "asc") return a[sortBy.name] - b[sortBy.name];
        return b[sortBy.name] - a[sortBy.name];
      });
    return movies;
  };

  const updateMovie = (id, body) => {
    console.log(id, body);
    axios
      .patch(`${BASE_URL}/movies/${id}`, body || updateBody)
      .then((res) => {
        console.log(res);
        setEditId(null);
        getAllMovies();
      })
      .catch((err) => console.log(err));
  };

  const getAllSources = async () => {
    let {
      data: { data },
    } = await axios.get(`${BASE_URL}/sources`);
    setSourceList(data);
  };

  return (
    <main className="movies-container">
      <div>
        <div onClick={getAllMovies}>
          <RefreshIcon width="20" />
        </div>

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
            allMovies={getSortedMovies()}
            sourceList={sourceList}
            displayWatched={displayWatched}
            getAllMovies={getAllMovies}
            setSortBy={setSortBy}
            sortBy={sortBy}
            editId={editId}
            setEditId={setEditId}
            updateBody={updateBody}
            setUpdateBody={setUpdateBody}
            updateMovie={updateMovie}
          />
        ) : (
          <MovieCard
            allMovies={getSortedMovies()}
            sourceList={sourceList}
            displayWatched={displayWatched}
            getAllMovies={getAllMovies}
            isTableView={isTableView}
            setSortBy={setSortBy}
            sortBy={sortBy}
            editId={editId}
            setEditId={setEditId}
            updateBody={updateBody}
            setUpdateBody={setUpdateBody}
            updateMovie={updateMovie}
          />
        )}
      </div>
    </main>
  );
}

export default Main;
