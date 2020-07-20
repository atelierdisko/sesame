import React from "react";
import { ReactComponent as ArrowDown } from "./icons/arrow_down.svg";
import { ReactComponent as ArrowRight } from "./icons/arrow_right.svg";

const icons = {
  down: <ArrowDown />,
  right: <ArrowRight />,
};

const Icon = ({ name }) => {
  const classes = ["icon"];
  classes.push(`icon--${name}`);

  return <span className={classes.join(" ")}>{icons[name]}</span>;
};

export default Icon;
