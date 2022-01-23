import React from "react";

import "./button.scss";
/**
 *
 * @param {String} variant [default, light, outline]
 * @returns
 */
function Button({
  children,
  type = "button",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  variant = "default",
  ...props
}) {
  return (
    <button className={`btn btn-${variant}`} type={type} {...props}>
      {React.isValidElement(LeftIcon) ? LeftIcon : LeftIcon && <LeftIcon />}
      {children}
      {React.isValidElement(RightIcon) ? RightIcon : RightIcon && <RightIcon />}
    </button>
  );
}

export default Button;
