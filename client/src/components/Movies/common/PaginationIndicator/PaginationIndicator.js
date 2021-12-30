import React, { useState } from "react";

import { ReactComponent as LeftChevronIcon } from "../../../../assets/icons/left-chevron.svg";
import { ReactComponent as RightChevronIcon } from "../../../../assets/icons/right-chevron.svg";

import "./PaginationIndicator.scss";

function PaginationIndicator({ totalCount, displayCount, itemPerPage = 20 }) {
  const [page, setPage] = useState(1);

  return (
    <div className="pagination-indicator">
      <LeftChevronIcon
        width="26"
        onClick={() =>
          setPage((prev) => {
            if (page === 1) return prev;
            return prev - 1;
          })
        }
      />

      <p style={{ textAlign: "center" }}>
        {page} of {Math.ceil(totalCount / itemPerPage)}
        <br />(
        {page === Math.ceil(totalCount / itemPerPage)
          ? (page - 1) * itemPerPage + (totalCount - (page - 1) * itemPerPage)
          : page * itemPerPage}
        {" / "}
        {totalCount})
      </p>

      <RightChevronIcon
        width="26"
        onClick={() =>
          setPage((prev) => {
            if (Math.ceil(totalCount / itemPerPage) === page) return prev;
            return prev + 1;
          })
        }
      />
    </div>
  );
}

export default PaginationIndicator;
