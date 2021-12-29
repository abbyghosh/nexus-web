import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import MovieCard from "./MovieCard/MovieCard";
import MovieTable from "./MovieTable/MovieTable";

import { ReactComponent as TableIcon } from "../../assets/icons/table.svg";
import { ReactComponent as WatchedIcon } from "../../assets/icons/watched.svg";
import { ReactComponent as NotWatchedIcon } from "../../assets/icons/not-watched.svg";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { ReactComponent as GoToTopIcon } from "../../assets/icons/circle-arrow-top.svg";

import { BASE_URL, ORDER_BY } from "../../utils/constants";

import "./movies.scss";
import { GlobalContext } from "../../context/GlobalState";
import useDevice from "../../customHooks/useDevice";
import { scrollToMovieCardPixel } from "../../utils";

function Main() {
  const { isMobile } = useDevice();
  const addOffsetRef = useRef(null);

  let {
    movie: {
      movies: { loading, error, data: allMovies },
      getAllMovies,
    },
    scrollBy: { scrollByValue, setScrollByValue },
  } = useContext(GlobalContext);

  const [isTableView, setIsTableView] = useState();
  const [displayWatched, setDisplayWatched] = useState(false);
  const [sourceList, setSourceList] = useState([]);

  const [editId, setEditId] = useState(null);
  const [updateBody, setUpdateBody] = useState({});
  const [sortedMovies, setSortedMovies] = useState([]);

  const [sortBy, setSortBy] = useState({ name: "", order: 0 });

  useEffect(() => {
    if (isMobile !== undefined) {
      if (isMobile) setIsTableView(false);
      else setIsTableView(true);
    }
  }, [isMobile]);

  useEffect(() => {
    setSortBy({ name: "", order: 0 });
  }, [displayWatched]);

  useEffect(() => {
    getAllMovies();
    getAllSources();
  }, []);

  useEffect(() => {
    getSortedMovies();
  }, [allMovies, sortBy]);

  useEffect(() => {
    if (scrollByValue) addOffsetRef.current.scrollBy({ top: scrollByValue, behavior: "smooth" });
  }, [scrollByValue]);

  const getSortedMovies = () => {
    let movies = [...allMovies];
    let sorted;

    if (sortBy.order > 0)
      sorted = movies.sort(function (a, b) {
        if (ORDER_BY[sortBy.order] === "asc") return a[sortBy.name] - b[sortBy.name];
        return b[sortBy.name] - a[sortBy.name];
      });
    setSortedMovies(sorted || allMovies);
  };

  const updateMovie = (id, body) => {
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

  if (isTableView === undefined) return <div>Loading...</div>;

  return (
    <main className="movies-container" ref={addOffsetRef}>
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
            allMovies={sortedMovies}
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
            allMovies={sortedMovies}
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
      <div
        className="goToTop"
        onClick={() => {
          let topPx = scrollToMovieCardPixel(sortedMovies[0].imDbId);
          setScrollByValue(topPx);
        }}
      >
        <GoToTopIcon />
      </div>
    </main>
  );
}

export default Main;
