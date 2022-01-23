import React from "react";

function Section({ title, children, className }) {
  return (
    <section className={`group ${className}`}>
      <h2 className="title">{title}</h2>
      {children}
    </section>
  );
}

export default Section;
