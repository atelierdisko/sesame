import React from 'react';
import './Textarea.css';

const Textarea = ({isPrimary, children, characterCount, maxCharacterCount, ...rest}) => {

  return (
    <div className='textarea'>
      <textarea {...rest} className='t-alpha'>
        {children}
      </textarea>

      <span className='character-count t-alpha'>
        {characterCount}/{maxCharacterCount}
      </span>
    </div>
  )
};

export default Textarea