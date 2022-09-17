import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { movieById } from "../../../services/movieService";
import { itemPerPage } from "../../../utils/constants";

import TruncatedElement from "../../common/TruncatedElement/TruncatedElement";
import MovieAction from "../common/MovieAction/MovieAction";
import PaginationIndicator from "../common/PaginationIndicator/PaginationIndicator";
import RatingStar from "../common/RatingStar/RatingStar";
import Filterable from "../MovieTable/Filterable/Filterable";
import Sortable from "../MovieTable/Sortable/Sortable";

import "./movieCard.scss";

function MovieCard({
  movies,
  sourceList,
  displayWatched,
  getAllMovies,
  isTableView,
  setSortBy,
  sortBy,
  editId,
  setEditId,
  updateBody,
  setUpdateBody,
  updateMovie,
}) {
  let {
    pagination: { movieCurrentPage, setMovieCurrentPage },
    users: { userDetails },
  } = useContext(GlobalContext);

  const [sourceFilter, setSourceFilter] = useState([]);
  const [sourceFilteredMovies, setSourceFilteredMovies] = useState([]);

  useEffect(() => {
    setSourceFilteredMovies((prev) => movies.filter((ele) => sourceFilter.includes(ele.source)));
  }, [sourceFilter]);

  const getMovieById = async (movieId, id) => {
    let {
      data: { imDbRating },
    } = await movieById(movieId);
    updateMovie(id, { imDb: imDbRating });
  };

  return (
    <>
      <div className="filtering-options">
        <div style={{ display: "flex", gap: 16 }}>
          <Sortable
            handleSortBy={setSortBy}
            headerLabel="Rating"
            field="imDb"
            sortedName={sortBy.name}
            sortedOrder={sortBy.order}
            resetPagination={() => setMovieCurrentPage(1)}
          />
          <Filterable
            headerLabel="Source"
            filterableFields={sourceFilter}
            handleFilterableFields={setSourceFilter}
            filterOptions={sourceList}
            resetPagination={() => setMovieCurrentPage(1)}
          />
        </div>
        <div>
          <PaginationIndicator
            totalCount={sourceFilteredMovies.length ? sourceFilteredMovies.length : movies?.length}
            itemPerPage={itemPerPage}
            currentPage={movieCurrentPage}
            setCurrentPage={setMovieCurrentPage}
          />
        </div>
      </div>

      <div className={`movie-card-wrapper${displayWatched ? " watched-movie" : ""}`}>
        {(sourceFilteredMovies.length ? sourceFilteredMovies : movies)
          ?.slice((movieCurrentPage - 1) * itemPerPage, movieCurrentPage * itemPerPage)
          .map(
            ({
              _id: id,
              imDbId,
              image,
              title,
              year,
              type,
              imDb,
              genres,
              source,
              watchQueue,
              watched,
              rewatchScore,
            }) => (
              <section className="movie-card" key={imDbId} id={imDbId}>
                <div className="movie-details">
                  <img src={image} alt={`${title} poster`} />
                  <div className="movie-content">
                    <p label={`${title} (${year})`} className="movie-name">
                      {`${title} (${year})`}
                    </p>
                    <div className="source">
                      {editId === id ? (
                        <select
                          value={updateBody.source}
                          onChange={(e) =>
                            setUpdateBody((prev) => ({ ...prev, source: e.target.value }))
                          }
                        >
                          {sourceList.map((option) => (
                            <option key={option._id} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        source || "-"
                      )}
                    </div>
                    <TruncatedElement label={genres.join(", ")} className="genres" />
                    <div>
                      Imdb: {imDb || <span onClick={() => getMovieById(imDbId, id)}>-</span>}{" "}
                    </div>
                    {displayWatched && (
                      <div>
                        Rewatch:
                        <RatingStar
                          id={id}
                          editId={editId}
                          updateBody={updateBody}
                          rewatchScore={rewatchScore}
                          setUpdateBody={setUpdateBody}
                        />
                      </div>
                    )}
                    {!displayWatched && (
                      <div>
                        Queue:{" "}
                        {editId === id ? (
                          <input
                            name="watchQueue"
                            value={updateBody.watchQueue}
                            onChange={(e) =>
                              setUpdateBody((prev) => ({ ...prev, watchQueue: e.target.value }))
                            }
                          />
                        ) : (
                          watchQueue || "-"
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {userDetails?.isAdmin && (
                  <MovieAction
                    id={id}
                    setId={setEditId}
                    isCurrentId={editId === id}
                    updateBody={() => setUpdateBody({ source, watchQueue, rewatchScore })}
                    reset={() => {
                      setEditId(null);
                      setUpdateBody({});
                    }}
                    watched={watched}
                    updateMovie={updateMovie}
                  />
                )}
              </section>
            )
          )}
      </div>

      <PaginationIndicator
        totalCount={sourceFilteredMovies.length || movies?.length}
        itemPerPage={itemPerPage}
        currentPage={movieCurrentPage}
        setCurrentPage={setMovieCurrentPage}
      />
    </>
  );
}

export default MovieCard;
