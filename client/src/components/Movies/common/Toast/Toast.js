import React, { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";

import { ReactComponent as SuccessIcon } from "../../../../assets/icons/success.svg";
import { ReactComponent as ErrorIcon } from "../../../../assets/icons/error.svg";
import { ReactComponent as WarningIcon } from "../../../../assets/icons/warning.svg";
import { ReactComponent as InfoIcon } from "../../../../assets/icons/info-circle.svg";

import "./toast.scss";

function Toast() {
  let {
    toast: {
      toastState: { msg, severity },
    },
  } = useContext(GlobalContext);

  return (
    <div className={`toast ${severity}`}>
      {msg}
      {severity === "success" && <SuccessIcon width="20" />}
      {severity === "error" && <ErrorIcon width="20" />}
      {severity === "warning" && <WarningIcon width="20" />}
      {severity === "info" && <InfoIcon width="20" />}
    </div>
  );
}

export default Toast;
