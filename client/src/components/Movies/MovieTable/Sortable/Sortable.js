import React from "react";

import { ReactComponent as SortIcon } from "../../../../assets/icons/sort-up.svg";

function Sortable({ handleSortBy, headerLabel, field, sortedName, sortedOrder, resetPagination }) {
  return (
    <div
      className="head-with-icon"
      onClick={() => {
        if (resetPagination) resetPagination();
        handleSortBy({
          name: field,
          order: sortedName === field ? (sortedOrder < 2 ? sortedOrder + 1 : 0) : 1,
        });
      }}
    >
      <p>{headerLabel}</p>
      <div className="sort-grouped">
        <SortIcon
          fill={
            sortedName === field && sortedOrder === 1 ? "var(--green-200)" : "var(--snow-white)"
          }
        />
        <SortIcon
          fill={
            sortedName === field && sortedOrder === 2 ? "var(--green-200)" : "var(--snow-white)"
          }
        />
      </div>
    </div>
  );
}

export default Sortable;
