import React from "react";
import { ReactComponent as RatingIcon } from "../../../../assets/icons/rating.svg";

function RatingStar({ id, editId, updateBody, rewatchScore, setUpdateBody }) {
  return [...new Array(3)].map((ele, i) => (
    <RatingIcon
      key={i}
      fill={
        i < ((id === editId && updateBody.rewatchScore) || rewatchScore)
          ? "var(---yellow-600)"
          : "var(--black-200)"
      }
      onClick={() => {
        if (editId === id) setUpdateBody((prev) => ({ ...prev, rewatchScore: i + 1 }));
      }}
    />
  ));
}

export default RatingStar;
