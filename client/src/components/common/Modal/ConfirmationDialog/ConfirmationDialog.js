import React from "react";

import Modal from "../Modal";

import "./confirmationDialog.scss";

function ConfirmationDialog({ children, closeModal, handleAccept, handleDeny, ...props }) {
  const getConfirmationFooter = () => {
    return (
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
    );
  };

  return (
    <Modal header="Confirmation" footer={getConfirmationFooter()} {...props} showCloseIcon={false}>
      {children}
    </Modal>
  );
}

export default ConfirmationDialog;
