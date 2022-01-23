import React from "react";

import Section from "../common/Section";

import "./skills.scss";

function Skills({ data, ...props }) {
  return (
    <Section {...props}>
      <div className="pills">
        {data.map((ele) => (
          <h3>{ele}</h3>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
