import React from "react";
import ReactDOM from "react-dom";

import "./confirmationDialog.scss";

const modalRoot = document.getElementById("modal-root");

function ConfirmationDialog({ isOpen, closeModal, handleAccept, handleDeny, body }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">Confirmation</div>
        <div className="modal-body">
          <p>{body}</p>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => {
              handleAccept();
              closeModal();
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              if (handleDeny) handleDeny();
              closeModal();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default ConfirmationDialog;
