import React from "react";

import "./button.scss";

function Button({ children, leftIcon: LeftIcon, rightIcon: RightIcon, ...props }) {
  console.log("Check", React.isValidElement(RightIcon));
  return (
    <button className="btn" {...props}>
      {React.isValidElement(LeftIcon) ? LeftIcon : LeftIcon && <LeftIcon />}
      {children}
      {React.isValidElement(RightIcon) ? RightIcon : RightIcon && <RightIcon />}
    </button>
  );
}

export default Button;
