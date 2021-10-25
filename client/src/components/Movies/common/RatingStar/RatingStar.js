import React from "react";
import { ReactComponent as RatingIcon } from "../../../../assets/icons/rating.svg";

function RatingStar({ editId, updateBody, rewatchScore, setUpdateBody }) {
  return [...new Array(3)].map((ele, i) => (
    <RatingIcon
      key={i}
      fill={
        i < (updateBody.rewatchScore || rewatchScore) ? "var(---yellow-600)" : "var(--black-200)"
      }
      onClick={() => {
        if (editId) setUpdateBody((prev) => ({ ...prev, rewatchScore: i + 1 }));
      }}
    />
  ));
}

export default RatingStar;
