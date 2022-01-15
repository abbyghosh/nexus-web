import React from "react";

function Section({ title, children }) {
  return (
    <section className="group">
      <h2 className="title">{title}</h2>
      {children}
    </section>
  );
}

export default Section;
