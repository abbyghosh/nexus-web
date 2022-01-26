import React from "react";

import "./loading.scss";

import { ReactComponent as LoadingIcon } from "../../../assets/icons/loading.svg";

function Loading({ width = 70 }) {
  return (
    <div className="loading">
      <LoadingIcon width={width} />
    </div>
  );
}

export default Loading;
