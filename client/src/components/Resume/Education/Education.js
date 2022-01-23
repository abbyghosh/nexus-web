import React from "react";

import Section from "../common/Section";

import "./education.scss";

function Education({ title, data }) {
  return (
    <Section title={title} className="page-break">
      <div className="education">
        {data.map((ele) => (
          <section>
            <section className="left">
              <h3 className="year">{ele.year}</h3>
              <h3 className="designation">{ele.designation}</h3>
            </section>
            <section className="right">
              <h3 className="name">{ele.name}</h3>
              <h3 className="stream">{ele.stream}</h3>
              <h3 className="location">{ele.location}</h3>
            </section>
          </section>
        ))}
      </div>
    </Section>
  );
}

export default Education;
