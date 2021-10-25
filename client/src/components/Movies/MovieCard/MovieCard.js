import React, { useState } from "react";

import MovieAction from "../../common/MovieAction/MovieAction";
import TruncatedElement from "../../common/TruncatedElement/TruncatedElement";

import "./movieCard.scss";

function MovieCard({ allMovies }) {
  const [editId, setEditId] = useState();

  return (
    <div className="movie-card-wrapper">
      {allMovies.map(
        ({
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
          <section className="movie-card" key={imDbId}>
            {/* <img src={image} alt={`${title} poster`} width="50" height="50" /> */}
            <div>
              <TruncatedElement label={`${title} (${year})`} className="movie-name" />
              <div>{source || "-"}</div>
              {/* <div className="extra-wrapper">
                  <div className={editId === imDbId ? "movie-detail-open" : "movie-detail-close"}> */}
              <TruncatedElement label={genres.join(", ")} className="genres" />
              <div>Imdb: {imDb || "-"}</div>
              <div>Rewatch: {rewatchScore || "-"}</div>
              <div>Queue: {watchQueue || "-"}</div>
              {/* </div>
                </div> */}
            </div>
            <MovieAction edit={setEditId} id={imDbId} />
          </section>
        )
      )}
    </div>
  );
}

export default MovieCard;
