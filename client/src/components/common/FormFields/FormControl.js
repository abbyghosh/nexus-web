import React from "react";
import ArrayInput from "./ArrayInput";

import Input from "./Input";
import Textarea from "./Textarea";

function FormControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;

    case "textarea":
      return <Textarea {...rest} />;

    case "array":
      return <ArrayInput {...rest} />;

    default:
      return null;
  }
}

export default FormControl;
