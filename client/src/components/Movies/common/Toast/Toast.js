import React, { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";

import "./toast.scss";

function Toast() {
  let {
    toast: {
      toastState: { msg, severity },
    },
  } = useContext(GlobalContext);

  return <div className={`toast ${severity}`}>{msg}</div>;
}

export default Toast;
