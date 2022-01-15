import React from "react";

import Section from "./Section";

import profile from "../../assets/images/abhishekprofile.jpeg";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";

import "./resume.scss";

function Resume() {
  const data = {
    name: "ABHISHEK GHOSH",
    title: "FRONTEND DEVELOPER",
    contactDetails: {
      phone: "9735150275",
      birthday: "5th December, 1995",
      location: "Shillong, Meghalaya",
      email: "abhishekghosh018@gmail.com",
      linkedIn: "linkedin.com/in/abhishekghosh2105/",
      github: "",
    },
    objectives:
      "Challenge-driven and detail-oriented IT professional with in-depth knowledge and proficiency in JavaScript, React, HTML, CSS, and mobile responsive website development. I am very focused on strong creative thinking with my problem solving skills amd wish to further maximizes the same. I am extensivily excited and aspire to join a team that could elevate my learing trajacteoory and also cater to my growth by getting more alligned with the larest trends. I'm also motivaed to work as full-stack developer that would strengthen my backend skills as well.",
    primarySkills: [
      "REACT",
      "JAVASCRIPT (ES8)",
      "REDUX",
      "WEBPACK",
      "JQUERY",
      "HTML5",
      "CSS",
      "SCSS",
      "STYLED COMPONENTS",
      "AEM",
      "GIT",
    ],
    library: ["SWR", "FORMIK", "MATERIAL UI", "BLUEPRINT JS", "RECHARTS", "REACT SELECT"],
    secondarySkills: ["NEXTJS", "NODEJS", "SQL", "JEST", "ANGULAR", "EXPRESSJS", "MONGODB", "JAVA"],
    languages: ["ENGLISH", "HINDI", "BENGALI"],
    workExperience: [
      {
        companyName: "PUBLICIS SAPIENT",
        url: "https://www.publicissapient.com/",
        degignation: "Associate Technology, L1",
        duration: "Mar ‘2021 - Present",
        projects: [
          {
            projectName: "ONE WELLINGTON",
            duration: "(Apr ‘2021 - Present)",
            technology: ["React", "JQuery", "AEM"],
            abstract: "A corporate website consisting of integrated homepage and funds.",
            responsibilities: ["Translating wireframes to code"],
          },
        ],
      },
      {
        companyName: "TORRY HARRIS BUSINESS SOLUTION",
        url: "https://www.torryharris.com/",
        degignation: "Software Engineer",
        duration: "Jan ‘2019 - Mar ’2021",
        projects: [
          {
            projectName: "OKR",
            duration: "(Aug ‘2019 - Mar ‘2021)",
            technology: ["React", "blueprintjs", "Recharts", "Putty", "Filezilla"],
            abstract:
              "Objectives and Key Results is Employees’ Performance Rating web-based application which includes creating OKR, updating progress, review, feedfack flows, admin privileges, etc.",
            responsibilities: [
              "Setting up an enterprise project from scratch and researching libraries best suited for the application like Recharts, Redux.",
              "Working closely with the service developer for API identification and designing and integrating the API with the application.",
              "Collaborating with the stakeholders and developers for feasible implementation of the business requirement.",
              "Triggering manual deployment for Dev, Test and Live environments using filezilla to nGinx server.",
            ],
          },
          {
            projectName: "GENIE",
            duration: "(Jan ‘2019 - Jul ‘2019)",
            technology: ["Angular 7", "primeNg", "Putty", "Filezilla"],
            abstract:
              "Web-based Employee Ticketing Tool which includes creating & editing tickets, sharing & transferring tickets, manual approval, administrater screens, etc.",
            responsibilities: [
              "Converting high fidelity as well as low fidelity wireframes ideas directly to code.",
              "Worked on feasible approaches for complex screens by doing POCs and research.",
              "Triggering manual deployment for Dev, Test and Live environments using filezilla to nGinx server.",
              "Identify post release bugs and provide reliable fixes.",
            ],
          },
        ],
      },
    ],
    education: [
      {
        name: "BENGAL COLLEGE OF ENGINEERING AND TECHNOLOGY",
        designation: "B. TECH",
        stream: "Electronics and Communication Engg.",
        location: "Durgapur, West Bengal",
        year: "2014-2018",
      },
      {
        name: "ST. EDMUND’S H. S. SECTION",
        designation: "CLASS XII",
        stream: "Science",
        location: "Shillong, Meghalaya",
        year: "2014-2018",
      },
      {
        name: "ST. PETER’S SCHOOL",
        designation: "CLASS X",
        stream: "",
        location: "Shillong, Meghalaya",
        year: "2000-2012",
      },
    ],
    achievements: [
      "Secured 2nd Position SPARRING (TAEKWONDO) organised by I.I.T. B.H.U. (2015).",
      "Secured 3rd Position POOMSAE (TAEKWONDO) organised by I.I.T. B.H.U. (2017).",
      "Leaded and trained the college Karate Team for tournaments and demonstrations.",
    ],
  };

  return (
    <main className="resume">
      <section className="header">
        <div>
          <img src={profile} alt="Abhishek's profile" height="150" width="150" />
        </div>

        <section className="head">
          <h1 className="name">Abhishek Ghosh</h1>
          <h2 className="title">Frontend Developer</h2>
          <section className="contact-details">
            <a href={data.contactDetails.phone}>{data.contactDetails.phone}</a>
            <h3>{data.contactDetails.birthday}</h3>
            <h3>{data.contactDetails.location}</h3>
            <a href={`mailto:${data.contactDetails.email}`}>{data.contactDetails.email}</a>
            <a href={`https://in.${data.contactDetails.linkedIn}`} target="_blank" rel="noreferrer">
              {data.contactDetails.linkedIn}
            </a>
          </section>
        </section>
      </section>

      <div className="body">
        <div className="left-column">
          <Section title="OBJECTIVES">
            <p className="objectives">{data.objectives}</p>
          </Section>

          <Section title="PRIMARY SKILLS">
            <div className="primary-skills pills">
              {data.primarySkills.map((ele) => (
                <h3>{ele}</h3>
              ))}
            </div>
          </Section>
          <Section title="LIBRARY">
            <div className="library pills">
              {data.library.map((ele) => (
                <h3>{ele}</h3>
              ))}
            </div>
          </Section>
          <Section title="SECONDARY SKILLS">
            <div className="secondary-skills pills">
              {data.secondarySkills.map((ele) => (
                <h3>{ele}</h3>
              ))}
            </div>
          </Section>
          <Section title="LANGUAGES">
            <div className="languages pills">
              {data.languages.map((ele) => (
                <h3>{ele}</h3>
              ))}
            </div>
          </Section>
        </div>

        <div className="right-column">
          <Section title="WORK EXPERIENCE">
            <div className="work-experience">
              {data.workExperience.map((ele) => (
                <section className="company">
                  <div className="inline">
                    <a href={ele.url} className="company-title">
                      {ele.companyName}
                    </a>
                    <h3 className="company-duration">{ele.duration}</h3>
                  </div>
                  <h3 className="company-desig">{ele.degignation}</h3>
                  {ele.projects.map((project) => (
                    <section className="projects">
                      <div className="project-head">
                        <h4 className="project-name">{project.projectName}</h4>
                        <h4 className="project-duration">{project.duration}</h4>
                      </div>
                      <h4 className="project-technology">{project.technology}</h4>
                      <p>{project.abstract}</p>
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

          <Section title="EDUCATION">
            <div className="education">
              {data.education.map((ele) => (
                <section>
                  <h3>{ele.name}</h3>
                  <h3>{ele.designation}</h3>
                  <h3>{ele.stream}</h3>
                  <h3>{ele.location}</h3>
                  <h3>{ele.year}</h3>
                </section>
              ))}
            </div>
          </Section>

          <Section title="ACHIEVEMENTS">
            <section>
              <ul className="achievements">
                {data.achievements.map((ele) => (
                  <li>{ele}</li>
                ))}
              </ul>
            </section>
          </Section>
        </div>
      </div>

      <button className="button-svg download-hanging" onClick={() => window.print()}>
        <DownloadIcon width="50" />
      </button>
    </main>
  );
}

export default Resume;
