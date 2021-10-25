import React, { useEffect, useState } from "react";
import axios from "axios";

import MovieAction from "../../common/MovieAction/MovieAction";
import RatingStar from "../common/RatingStar/RatingStar";
import Sortable from "./Sortable/Sortable";
import Filterable from "./Filterable/Filterable";

import { BASE_URL, ORDER_BY } from "../../../utils/constants";

import "./movieTable.scss";

function MovieTable({ allMovies, sourceList, displayWatched, getAllMovies }) {
  const [editId, setEditId] = useState(null);
  const [updateBody, setUpdateBody] = useState({});
  const [sourceFilter, setSourceFilter] = useState([]);
  const [sortBy, setSortBy] = useState({ name: "", order: 0 });
  const [movieBannerPreview, setMovieBannerPreview] = useState("");

  useEffect(() => {
    setSortBy({ name: "", order: 0 });
  }, [displayWatched]);

  const updateMovie = (id, body) => {
    console.log(id, editId, body);
    axios
      .patch(`${BASE_URL}/movies/${id || editId}`, body || updateBody)
      .then((res) => {
        console.log(res);
        setEditId(null);
        getAllMovies();
      })
      .catch((err) => console.log(err));
  };

  const getSortedMovies = () => {
    let movies = [...allMovies];
    if (sortBy.order > 0)
      return movies.sort(function (a, b) {
        if (ORDER_BY[sortBy.order] === "asc") return a[sortBy.name] - b[sortBy.name];
        return b[sortBy.name] - a[sortBy.name];
      });
    return movies;
  };

  return (
    <div className="tableFixHead">
      <table className="card-table">
        <thead>
          <tr>
            <th width="40%">Name</th>
            <th width="10%">
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
          {getSortedMovies().map(
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
                      setId={setEditId}
                      updateBody={() => setUpdateBody({ source, watchQueue, rewatchScore })}
                      reset={() => {
                        setEditId(null);
                        setUpdateBody({});
                      }}
                      id={id}
                      editId={editId === id ? id : null}
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
