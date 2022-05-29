import React from "react";

import "./tagsGroup.scss";

function TagsGroup({ label = "Filters", tagslist }) {
  return (
    <div className="tags-group">
      {label}

      <ul className="tabs">
        {tagslist.map((tab) => (
          <li key={tab._id}>{tab.tab}</li>
        ))}
      </ul>

      <button>Reset</button>
    </div>
  );
}

export default TagsGroup;
