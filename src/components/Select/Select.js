import React from 'react';
import './Select.css';

const Select = ({isPrimary, children, ...rest}) => {
  return (
    <select {...rest}>{children}</select>
  )
};

export default Select