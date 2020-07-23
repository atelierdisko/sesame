import React from "react";
import "./Select.css";
import Icon from "../Icon/Icon";

const Select = ({ isPrimary, children, ...rest }) => {
  return (
    <div className="select">
      <select className="select__content" {...rest}>
        {children}
      </select>
      <span className="select__icon">
        <Icon name="down" />
      </span>
    </div>
  );
};

export default Select;
