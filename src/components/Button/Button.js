import React from "react";
import "./Button.css";
import Icon from "../Icon/Icon";

const Button = ({
  isPrimary,
  isDangerous,
  isDisabled,
  isLoading,
  children,
  indicator = true,
  ...rest
}) => {
  const classes = ["button"];

  if (isPrimary) classes.push("button--primary");
  if (isDangerous) classes.push("button--dangerous");
  if (isDisabled) classes.push("button--disabled");
  if (isLoading) classes.push("button--loading");

  return (
    <button {...rest} className={classes.join(" ")}>
      {children}
      {indicator && <Icon name="right" />}
    </button>
  );
};

export default Button;
