import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./confirmationDialog.scss";

const modalRoot = document.getElementById("modal-root");

function ConfirmationDialog({ isOpen, closeModal, handleAccept, handleDeny, body }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="confirmation" ref={dialogRef} tabIndex={0}>
      <div className="confirmation-container">
        <div className="confirmation-header">Confirmation</div>
        <div className="confirmation-body">
          <p>{body}</p>
        </div>
        <div className="confirmation-footer">
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
