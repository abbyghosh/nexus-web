import React from "react";

import "./leftMenu.scss";

const menu = [
  {
    _id: "1",
    name: "Frontend",
    topics: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Javascript" },
      { _id: "3", name: "Webpack" },
    ],
  },
  {
    _id: "2",
    name: "Backend",
    topics: [
      { _id: "1", name: "Java" },
      { _id: "2", name: "Node" },
      { _id: "3", name: "Misc." },
    ],
  },
];

function LeftMenu() {
  return (
    <nav className="left-nav">
      {menu.map((item) => (
        <ul key={item._id}>
          <h2>{item.name}</h2>
          {item.topics.map((ele) => (
            <li key={ele._id}>{ele.name}</li>
          ))}
        </ul>
      ))}
    </nav>
  );
}

export default LeftMenu;
