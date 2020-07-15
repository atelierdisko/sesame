import React from "react";
import "./Select.css";
import Icon from "../Icon/Icon";

const Select = ({ isPrimary, children, ...rest }) => {
  return (
    <div className="select">
      <select {...rest}>{children}</select>
      <Icon name="down" />
    </div>
  );
};

export default Select;
