import React from 'react';
import './Input.css';

const Input = ({isPrimary, children, ...rest}) => {
  return (
    <input {...rest}/>
  )
};

export default Input