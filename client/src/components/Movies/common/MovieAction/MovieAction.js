import React, { useContext } from "react";
import axios from "axios";

import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/delete.svg";
import { ReactComponent as SeenIcon } from "../../../../assets/icons/seen.svg";
import { ReactComponent as UpdateIcon } from "../../../../assets/icons/save-tick.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/dont-save-close.svg";

import { GlobalContext } from "../../../../context/GlobalState";

import { BASE_URL } from "../../../../utils/constants";

import "./movieAction.scss";

function MovieAction({ id, isCurrentId, setId, watched, updateMovie, updateBody, reset }) {
  let {
    movie: { getAllMovies },
  } = useContext(GlobalContext);

  const deleteMovie = (id) => {
    axios
      .delete(`${BASE_URL}/movies/${id}`)
      .then((res) => {
        console.log(res);
        getAllMovies();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="actions">
      <div style={{ position: "relative" }}>
        <EditIcon
          onClick={() => {
            setId(id);
            updateBody();
          }}
        />
        {isCurrentId && (
          <div className="edit-options">
            <UpdateIcon onClick={() => updateMovie(id)} />
            <CloseIcon onClick={reset} />
          </div>
        )}
      </div>
      <DeleteIcon onClick={() => deleteMovie(id)} />
      {!watched && <SeenIcon onClick={() => updateMovie(id, { watched: true })} />}
    </div>
  );
}

export default MovieAction;
