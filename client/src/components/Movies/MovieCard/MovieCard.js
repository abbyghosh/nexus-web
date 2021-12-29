import React, { useState } from "react";

import TruncatedElement from "../../common/TruncatedElement/TruncatedElement";
import MovieAction from "../common/MovieAction/MovieAction";
import PaginationIndicator from "../common/PaginationIndicator/PaginationIndicator";
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
    <div className="movie-card-wrapper">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
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
        <div>
          <PaginationIndicator totalCount={allMovies.length} />
        </div>
      </div>
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
  );
}

export default MovieCard;
