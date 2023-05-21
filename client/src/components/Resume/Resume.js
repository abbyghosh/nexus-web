import React from "react";

import Objective from "./Objective/Objective";
import Skills from "./Skills/Skills";
import Experience from "./Experience/Experience";
import Education from "./Education/Education";
import Achievements from "./Achievements/Achievements";
import profile from "../../assets/images/abhishekprofile.jpeg";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";

import { ReactComponent as PhoneIcon } from "./assets/phone_solid_icon.svg";
import { ReactComponent as BirthdayIcon } from "./assets/birthday_icon.svg";
import { ReactComponent as EmailIcon } from "./assets/email_solid_icon.svg";
import { ReactComponent as LinkedinIcon } from "./assets/linkedin_icon.svg";
import { ReactComponent as LocationIcon } from "./assets/location_solid_icon.svg";

import "./resume.scss";

const data = {
  id: 1,
  version: 1,
  name: "ABHISHEK GHOSH",
  title: "FRONTEND DEVELOPER",
  contactDetails: {
    phone: "9735150275",
    birthday: "5th December, 1995",
    location: "Shillong, Meghalaya",
    email: "abhishekghosh018@gmail.com",
    linkedIn: "linkedin.com/in/abhishekghosh2105/",
    github: "",
    portfolio: "",
  },
  /* //objectives:
    "Challenge-driven and detail-oriented IT professional with in-depth knowledge and proficiency in JavaScript, React, HTML, CSS, and mobile responsive website development. I am very focused on strong creative thinking with my problem solving skills amd wish to further maximizes the same. I am extensivily excited and aspire to join a team that could elevate my learing trajacteoory and also cater to my growth by getting more alligned with the larest trends. I'm also motivaed to work as full-stack developer that would strengthen my backend skills as well.", */
  objectives:
    "Seeking a challenging position as a Frontend Developer to utilize my 4+ years of experience and expertise in creating visually appealing and user-friendly web applications. With a keen eye for detail and a passion for creating exceptional user interfaces, I aim to enhance the overall user experience and drive customer satisfaction. I am highly enthusiastic and eager to join a team that can accelerate my learning trajectory and provide opportunities that caters to my growth while keeping me abreast of the latest industry trends. Additionally, I am driven to pursue a role as a full-stack developer in order to further enhance my proficiency in backend development.",
  primarySkills: [
    "REACT",
    "JAVASCRIPT",
    "AEM",
    "REDUX",
    "WEBPACK",
    "JQUERY",
    "HTML5",
    "CSS",
    "SCSS",
    "GIT",
    "STYLED COMPONENTS",
  ],
  library: ["SWR", "FORMIK", "MATERIAL UI", "BLUEPRINT JS", "RECHARTS", "REACT SELECT"],
  secondarySkills: ["NEXTJS", "JAVA", "NODEJS", "SQL", "JEST", "ANGULAR", "EXPRESSJS", "MONGODB"],
  languages: ["ENGLISH", "HINDI", "BENGALI"],
  workExperience: [
    {
      companyName: "PUBLICIS SAPIENT",
      url: "https://www.publicissapient.com/",
      degignation: "Associate Technology, L2",
      duration: "Mar ‘2021 - Present",
      projects: [
        {
          projectName: "ONE WELLINGTON",
          duration: "(Apr ‘2021 - Present)",
          technology: ["React", "JQuery", "AEM"],
          abstract:
            "At Publicis Sapient, I am working as a Frontend Developer on a financial company website redesign project on Adobe Experience Manager.",
          responsibilities: [
            "Improved website performance and optimized code for search engine optimization (SEO).",
            "Utilized agile methodologies for project management and collaborated with cross-functional teams.",
            "Hands-on experience with Redux, along with proficiency in front-end tools like Webpack, NPM, Babel, Git",
          ],
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
    "Lead and trained the college Karate Team for tournaments and demonstrations.",
  ],
};

function Resume() {
  return (
    <main className="resume">
      <section className="header">
        <div className="img-holder">
          <img src={profile} alt="Abhishek's profile" height="160" width="160" />
        </div>

        <section className="head">
          <h1 className="candidate-name">Abhishek Ghosh</h1>
          <h2 className="role">Frontend Developer</h2>
          <section className="contact-details">
            <a href={`tel:${data.contactDetails.phone}`} className="phone">
              <PhoneIcon />
              {data.contactDetails.phone}
            </a>
            <h3 className="birthday">
              <BirthdayIcon />
              {data.contactDetails.birthday}
            </h3>
            <h3 className="location">
              <LocationIcon />
              {data.contactDetails.location}
            </h3>
            <a href={`mailto:${data.contactDetails.email}`} className="email">
              <EmailIcon />
              {data.contactDetails.email}
            </a>
            {/* <a href={`https://${data.contactDetails.linkedIn}`} target="_blank" rel="noreferrer">
              {data.contactDetails.linkedIn}
            </a> */}
            <a
              href={`https://linkedin.com/in/abhishekghosh2105/`}
              target="_blank"
              rel="noreferrer"
              className="linkedin"
            >
              <LinkedinIcon />
              /in/abhishekghosh2105/
            </a>
          </section>
        </section>
      </section>

      <div className="body">
        <div className="left-column">
          <Objective title="OBJECTIVES" data={data.objectives} />
          <Skills title="CORE SKILLS" data={data.primarySkills} />
          <Skills title="LIBRARY" data={data.library} />
          <Skills title="SECONDARY SKILLS" data={data.secondarySkills} />
          <Skills title="LANGUAGES" data={data.languages} />
        </div>

        <div className="right-column">
          <Experience title="WORK EXPERIENCE" data={data.workExperience} />
          <Education title="EDUCATION" data={data.education} />
          <Achievements title="ACHIEVEMENTS" data={data.achievements} />
        </div>
      </div>

      <button className="button-svg download-hanging" onClick={() => window.print()}>
        <DownloadIcon width="50" />
      </button>
    </main>
  );
}

export default Resume;
