import React from "react";
import Section from "../common/Section";

import "./objective.scss";

function Objective({ title, data }) {
  return (
    <Section title={title}>
      <p className="objectives">{data}</p>
    </Section>
  );
}

export default Objective;
