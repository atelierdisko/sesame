import React, {forwardRef} from 'react';
import './Input.css';

const Input = forwardRef(({...rest}, ref) => {

  return (
    <input {...rest} ref={ref}/>
  )
});

export default Input