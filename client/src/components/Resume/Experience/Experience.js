import React from "react";

import Section from "../common/Section";

import "./experience.scss";

function Experience({ title, data }) {
  return (
    <Section title={title}>
      <div className="work-experience timeline-line">
        {data.map((ele) => (
          <section className="company">
            <div className="company-head">
              <a href={ele.url} className="company-title timeline-indicator">
                {ele.companyName}
              </a>
              <h3 className="company-duration">{ele.duration}</h3>
            </div>
            <h3 className="company-desig">{ele.degignation}</h3>
            {ele.projects.map((project) => (
              <section className="projects">
                <div className="project-head">
                  <h4 className="project-name timeline-indicator-secondary">
                    {project.projectName}
                  </h4>
                  <h4 className="project-duration">{project.duration}</h4>
                </div>
                <h4 className="project-technology">
                  <label>Technology: </label>
                  <p>{project.technology.join(", ")}</p>
                </h4>
                <p className="project-abstract">{project.abstract}</p>
                <ul>
                  {project.responsibilities.map((resp) => (
                    <li>{resp}</li>
                  ))}
                </ul>
              </section>
            ))}
          </section>
        ))}
      </div>
    </Section>
  );
}

export default Experience;
