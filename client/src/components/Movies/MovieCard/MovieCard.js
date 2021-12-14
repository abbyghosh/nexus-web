import React, { useState } from "react";

import TruncatedElement from "../../common/TruncatedElement/TruncatedElement";
import MovieAction from "../common/MovieAction/MovieAction";
import RatingStar from "../common/RatingStar/RatingStar";
import Filterable from "../MovieTable/Filterable/Filterable";
import Sortable from "../MovieTable/Sortable/Sortable";

import "./movieCard.scss";

function MovieCard({
  allMovies,
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
  const [sourceFilter, setSourceFilter] = useState([]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", bottom: 18, display: "flex", gap: 20 }}>
          <Sortable
            handleSortBy={setSortBy}
            headerLabel="Rating"
            field="imDb"
            sortedName={sortBy.name}
            sortedOrder={sortBy.order}
          />
          {/* <Filterable
            headerLabel="Source"
            filterableFields={sourceFilter}
            handleFilterableFields={setSourceFilter}
            filterOptions={sourceList}
          /> */}
        </div>
      </div>

      <div className="movie-card-wrapper">
        {allMovies.map(
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
          }) =>
            watched === displayWatched && (
              <section className="movie-card" key={imDbId}>
                <div className="movie-details">
                  <img src={image} alt={`${title} poster`} />
                  <div className="movie-content">
                    <div>
                      <p label={`${title} (${year})`} className="movie-name">
                        {`${title} (${year})`}
                      </p>
                    </div>
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
                    {/* <div className="extra-wrapper">
                      <div className={editId === imDbId ? "movie-detail-open" : "movie-detail-close"}> */}
                    <TruncatedElement label={genres.join(", ")} className="genres" />
                    <div>Imdb: {imDb || "-"}</div>
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
              </section>
            )
        )}
      </div>
    </>
  );
}

export default MovieCard;
