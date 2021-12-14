import React from "react";

function TruncatedElement({ label, className }) {
  return (
    <div title={label} className={`truncate ${className}`}>
      {label}
    </div>
  );
}

export default TruncatedElement;
