import React from "react";

function Section({ title, children, className }) {
  const addPageBreak = (e) => {
    e.currentTarget.parentElement.classList.toggle("page-break");
  };

  return (
    <section className={`group${className ? ` ${className}` : ""}`}>
      <button
        title="Page Break (Breaks it to a new page while printing)"
        className="pagebreak-icon"
        onClick={addPageBreak}
      >
        &#x25BA;
      </button>
      <h2 className="heading">{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

export default Section;
