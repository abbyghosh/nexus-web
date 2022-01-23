import React from "react";

import Section from "../common/Section";

import "./achievements.scss";

function Achievements({ title, data }) {
  return (
    <Section title={title}>
      <section>
        <ul className="achievements">
          {data.map((ele) => (
            <li>{ele}</li>
          ))}
        </ul>
      </section>
    </Section>
  );
}

export default Achievements;
