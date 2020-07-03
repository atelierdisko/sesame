import React from 'react';
import './Button.css';

const Button = ({isPrimary, isDisabled, isLoading, children, ...rest}) => {

  const classes = ['button'];

  if (isPrimary) {classes.push('button--primary');}
  if (isDisabled) classes.push('button--disabled');
  if (isLoading) classes.push('button--loading');

  return (
    <button {...rest} className={classes.join(' ')}>{children}</button>
  )
};

export default Button