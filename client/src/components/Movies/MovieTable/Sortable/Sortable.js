import React from "react";

import { ReactComponent as SortIcon } from "../../../../assets/icons/sort-up.svg";

function Sortable({ handleSortBy, headerLabel, field, sortedName, sortedOrder }) {
  return (
    <div
      className="head-with-icon"
      onClick={() =>
        handleSortBy({
          name: field,
          order: sortedName === field ? (sortedOrder < 2 ? sortedOrder + 1 : 0) : 1,
        })
      }
    >
      <p>{headerLabel}</p>
      <div className="sort-grouped">
        <SortIcon fill={sortedName === field && sortedOrder === 1 ? "#00ffe7" : "white"} />
        <SortIcon fill={sortedName === field && sortedOrder === 2 ? "#00ffe7" : "white"} />
      </div>
    </div>
  );
}

export default Sortable;
