import React from "react";

function ErrorMsg({ id, children }) {
  return (
    <label class="form-error" htmlFor={id} aria-label={children} aria-live="assertive">
      {children}
    </label>
  );
}

export default ErrorMsg;
