import React from "react";

import { ReactComponent as LeftChevronIcon } from "../../../../assets/icons/left-chevron.svg";
import { ReactComponent as RightChevronIcon } from "../../../../assets/icons/right-chevron.svg";

import { itemPerPage } from "../../../../utils/constants";

import "./PaginationIndicator.scss";

function PaginationIndicator({ totalCount, currentPage, setCurrentPage }) {
  return (
    <div className="pagination-indicator">
      <button
        onClick={() => {
          setCurrentPage((prev) => {
            if (currentPage === 1) return prev;
            return prev - 1;
          });
        }}
        disabled={currentPage === 1}
      >
        <LeftChevronIcon width="20" />
      </button>

      <p style={{ textAlign: "center" }}>
        <strong>{currentPage}</strong> of {Math.ceil(totalCount / itemPerPage)} (
        {currentPage === Math.ceil(totalCount / itemPerPage)
          ? (currentPage - 1) * itemPerPage + (totalCount - (currentPage - 1) * itemPerPage)
          : currentPage * itemPerPage}
        {" / "}
        <strong>{totalCount})</strong>
      </p>

      <button
        onClick={() => {
          setCurrentPage((prev) => {
            if (Math.ceil(totalCount / itemPerPage) === currentPage) return prev;
            return prev + 1;
          });
        }}
        disabled={currentPage === Math.ceil(totalCount / itemPerPage)}
      >
        <RightChevronIcon width="20" />
      </button>
    </div>
  );
}

export default PaginationIndicator;
