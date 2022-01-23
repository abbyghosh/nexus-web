import React from "react";

import "./loading.scss";

import { ReactComponent as LoadingIcon } from "../../../assets/icons/loading.svg";

function Loading() {
  return (
    <div className="loading">
      <LoadingIcon width="70" />
    </div>
  );
}

export default Loading;
