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
              <a
                href={ele.url}
                target="_blank"
                rel="noopener noreferrer"
                className="company-name timeline-indicator"
              >
                {ele.companyName}
              </a>
            </div>
            <div class="company-misc">
              <h3 className="company-desig">{ele.degignation}</h3>
              <h3 className="company-duration">{ele.duration}</h3>
            </div>

            <div className="projects">
              {ele.projects.map((project) => (
                <section className="project">
                  <div className="project-head">
                    <h4 className="project-name timeline-indicator-secondary">
                      {project.projectName}
                    </h4>
                    {/* <h4 className="project-duration">{project.duration}</h4> */}
                  </div>
                  <div className="project-body">
                    <p className="project-abstract">{project.abstract}</p>
                    <p className="project-technology">
                      <label>Technology: </label>
                      <p>{project.technology.join(", ")}</p>
                    </p>
                    <p className="project-role">
                      <label>Roles & Responsibilities : </label>
                      <ul>
                        {project.responsibilities.map((resp) => (
                          <li>{resp}</li>
                        ))}
                      </ul>
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}

export default Experience;
