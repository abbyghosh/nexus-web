import React from "react";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { ReactComponent as SeenIcon } from "../../../assets/icons/seen.svg";
import { ReactComponent as UpdateIcon } from "../../../assets/icons/save-tick.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/dont-save-close.svg";

import "./movieAction.scss";

function MovieAction({ id, editId, setId, watched, updateMovie, updateBody, reset }) {
  return (
    <div className="actions">
      <div style={{ position: "relative" }}>
        <EditIcon
          onClick={() => {
            setId(id);
            updateBody();
          }}
        />
        {editId && (
          <div className="edit-options">
            <UpdateIcon onClick={updateMovie} />
            <CloseIcon onClick={reset} />
          </div>
        )}
      </div>
      <DeleteIcon />
      {!watched && <SeenIcon onClick={() => updateMovie(id, { watched: true })} />}
    </div>
  );
}

export default MovieAction;
