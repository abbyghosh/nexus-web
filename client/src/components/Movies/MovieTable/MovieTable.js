import React, { useState } from "react";

import MovieAction from "../common/MovieAction/MovieAction";
import RatingStar from "../common/RatingStar/RatingStar";
import Sortable from "./Sortable/Sortable";
import Filterable from "./Filterable/Filterable";

import "./movieTable.scss";

function MovieTable({
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
  const [movieBannerPreview, setMovieBannerPreview] = useState("");

  return (
    <div className="tableFixHead">
      <table className="card-table">
        <thead>
          <tr>
            <th width="35%">Name</th>
            <th width="15%">
              <Filterable
                headerLabel="Source"
                filterableFields={sourceFilter}
                handleFilterableFields={setSourceFilter}
                filterOptions={sourceList}
              />
            </th>
            <th width="20%">Genre</th>
            <th width="10%">
              <Sortable
                handleSortBy={setSortBy}
                headerLabel="Rating"
                field="imDb"
                sortedName={sortBy.name}
                sortedOrder={sortBy.order}
              />
            </th>
            <th width="10%">
              <Sortable
                handleSortBy={setSortBy}
                headerLabel={displayWatched ? "Rewatch" : "Queue"}
                field={displayWatched ? "rewatchScore" : "watchQueue"}
                sortedName={sortBy.name}
                sortedOrder={sortBy.order}
              />
            </th>
            <th width="10%">Actions</th>
          </tr>
        </thead>
        <tbody>
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
              watched === displayWatched &&
              (sourceFilter.length === 0 || sourceFilter.includes(source)) && (
                <tr key={id}>
                  <td>
                    <span
                      onMouseEnter={() => setMovieBannerPreview(image)}
                      onMouseLeave={() => setMovieBannerPreview("")}
                    >{`${title} (${year})`}</span>

                    {image === movieBannerPreview && (
                      <img
                        src={movieBannerPreview}
                        alt={`${title} poster`}
                        width="200"
                        className="image-preview"
                      />
                    )}
                  </td>
                  <td>
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
                  </td>
                  <td title={genres.join(", ")}>
                    <div className="truncate">{genres.join(", ")}</div>
                  </td>
                  <td style={{ textAlign: "center" }}>{imDb || "-"}</td>
                  <td style={{ textAlign: "center" }}>
                    {/* Display Rewatch */}
                    {displayWatched && (
                      <RatingStar
                        id={id}
                        editId={editId}
                        updateBody={updateBody}
                        rewatchScore={rewatchScore}
                        setUpdateBody={setUpdateBody}
                      />
                    )}
                    {/* Display Watched */}
                    {!displayWatched &&
                      (editId === id ? (
                        <input
                          name="watchQueue"
                          value={updateBody.watchQueue}
                          onChange={(e) =>
                            setUpdateBody((prev) => ({ ...prev, watchQueue: e.target.value }))
                          }
                        />
                      ) : (
                        watchQueue || "-"
                      ))}
                  </td>
                  <td>
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
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MovieTable;
