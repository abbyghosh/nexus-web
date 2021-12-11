import React from "react";

function TruncatedElement({ label, className }) {
  return (
    <p title={label} className={`truncate ${className}`}>
      {label}
    </p>
  );
}

export default TruncatedElement;
