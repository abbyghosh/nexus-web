import React from "react";

import "./tabs.scss";

function Tabs({ tabslist }) {
  return (
    <ul className="tabs">
      {tabslist.map((tab) => (
        <li key={tab._id}>{tab.tab}</li>
      ))}
    </ul>
  );
}

export default Tabs;
