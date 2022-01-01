import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

import { GlobalContext } from "../../context/GlobalState";
import useDevice from "../../customHooks/useDevice";
import MovieCard from "./MovieCard/MovieCard";
import MovieTable from "./MovieTable/MovieTable";

import { ReactComponent as TableIcon } from "../../assets/icons/table.svg";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { ReactComponent as GoToTopIcon } from "../../assets/icons/circle-arrow-top.svg";

import { debounce, scrollToMovieCardPixel } from "../../utils";
import { BASE_URL, ORDER_BY } from "../../utils/constants";

import "./movies.scss";

function Main() {
  const { isMobile } = useDevice();
  const addOffsetRef = useRef(null);

  const {
    movie: {
      movies: { loading, error, data: allMovies },
      getAllMovies,
    },
    scrollBy: { scrollByValue, setScrollByValue },
    pagination: { setMovieCurrentPage },
  } = useContext(GlobalContext);

  const [isTableView, setIsTableView] = useState();
  const [displayWatched, setDisplayWatched] = useState(false);
  const [sourceList, setSourceList] = useState([]);

  const [editId, setEditId] = useState(null);
  const [updateBody, setUpdateBody] = useState({});
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sortBy, setSortBy] = useState({ name: "", order: 0 });
  const [initiateScroll, setInitiateScroll] = useState(false);
  let scrollTimer;

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

  const initiateAnimateOnScroll = (e) => {
    setInitiateScroll(true);
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      console.log("scroll run");
      setInitiateScroll(false);
    }, 5000);
  };

  const debouncedScroll = useCallback(debounce(initiateAnimateOnScroll, 600), []);

  const getSortedMovies = () => {
    let movies = allMovies.filter((ele) => ele.watched === displayWatched);
    let sorted;

    if (sortBy.order > 0)
      sorted = movies.sort(function (a, b) {
        if (ORDER_BY[sortBy.order] === "asc") return a[sortBy.name] - b[sortBy.name];
        return b[sortBy.name] - a[sortBy.name];
      });
    setSortedMovies(sorted || movies);
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
    <main className="movies-container" ref={addOffsetRef} onScroll={debouncedScroll}>
      <div className="movie-view-tool" id="scroll-here">
        <div className="status-tab">
          <div
            className={!displayWatched ? "active" : ""}
            onClick={() => {
              setMovieCurrentPage(1);
              setDisplayWatched(false);
            }}
          >
            Not Watched
          </div>
          <div
            className={displayWatched ? "active" : ""}
            onClick={() => {
              setMovieCurrentPage(1);
              setDisplayWatched(true);
            }}
          >
            Watched
          </div>
        </div>
        <div>
          <div onClick={getAllMovies}>
            <RefreshIcon width="20" />
          </div>
          <div
            className={isTableView ? null : "no-table-view"}
            onClick={() => setIsTableView((prev) => !prev)}
            style={{ color: isTableView ? "#9b9b9b" : "#666666" }}
          >
            <TableIcon width="20" />
          </div>
        </div>
      </div>

      <div className="main-inner-wrapper">
        {isTableView ? (
          <MovieTable
            movies={sortedMovies}
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
            movies={sortedMovies}
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
        className={`goToTop${initiateScroll ? " goToTop-animate" : ""}`}
        onClick={() => {
          //scrollToMovieCardPixel(sortedMovies[(movieCurrentPage - 1) * itemPerPage + 1].imDbId)
          let topPx = scrollToMovieCardPixel("scroll-here");
          setScrollByValue(topPx);
        }}
      >
        <GoToTopIcon />
      </div>
    </main>
  );
}

export default Main;
