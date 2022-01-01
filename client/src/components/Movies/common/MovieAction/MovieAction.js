import React, { useContext, useState } from "react";
import axios from "axios";

import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/delete.svg";
import { ReactComponent as SeenIcon } from "../../../../assets/icons/seen.svg";
import { ReactComponent as UpdateIcon } from "../../../../assets/icons/save-tick.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/dont-save-close.svg";

import { GlobalContext } from "../../../../context/GlobalState";
import ConfirmationDialog from "../../../common/ConfirmationDialog/ConfirmationDialog";

import { BASE_URL } from "../../../../utils/constants";

import "./movieAction.scss";

function MovieAction({ id, isCurrentId, setId, watched, updateMovie, updateBody, reset }) {
  let {
    movie: { getAllMovies },
  } = useContext(GlobalContext);

  const [seenModalOpen, setSeenModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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
      <div style={{ position: "relative", display: "flex" }}>
        <button className="button-svg">
          <EditIcon
            onClick={() => {
              setId(id);
              updateBody();
            }}
          />
        </button>
        {isCurrentId && (
          <div className="edit-options">
            <UpdateIcon onClick={() => updateMovie(id)} />
            <CloseIcon onClick={reset} />
          </div>
        )}
      </div>
      <button className="button-svg">
        <DeleteIcon className="remove-highlight" onClick={() => setEditModalOpen(true)} />
      </button>
      {!watched && (
        <button className="button-svg">
          <SeenIcon className="remove-highlight" onClick={() => setSeenModalOpen(true)} />
        </button>
      )}

      <ConfirmationDialog
        isOpen={seenModalOpen}
        closeModal={() => setSeenModalOpen(false)}
        handleAccept={() => {
          updateMovie(id, { watched: true });
        }}
        body={"Are you sure to mark the movie seen?"}
      />
      <ConfirmationDialog
        isOpen={editModalOpen}
        closeModal={() => setEditModalOpen(false)}
        handleAccept={() => {
          deleteMovie(id);
        }}
        body={"Are you sure to delete the movie?"}
      />
    </div>
  );
}

export default MovieAction;
