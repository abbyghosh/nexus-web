import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { ReactComponent as CloseIcon } from "../../../assets/icons/cross.svg";

import "./modal.scss";

const modalRoot = document.getElementById("modal-root");

function Modal({ children, header, isOpen, footer, handleCLose, showCloseIcon = true }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal" ref={dialogRef} tabIndex={0}>
      <div className="modal-container">
        <div className="modal-header">
          {header}

          {showCloseIcon && (
            <span>
              <CloseIcon width="12" onClick={handleCLose} />
            </span>
          )}
        </div>
        <div className="modal-body">{children}</div>
        {footer}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
