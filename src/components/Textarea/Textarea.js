import React from 'react';
import './Textarea.css';

const Textarea = ({isPrimary, children, ...rest}) => {
  return (
    <textarea {...rest}>{children}</textarea>
  )
};

export default Textarea