import React, { useState } from "react";
import "./Textarea.css";

const Textarea = ({
  isPrimary,
  children,
  characterCount,
  maxCharacterCount,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const classes = ["textarea"];

  if (focused) {
    classes.push("textarea--focused");
  }

  return (
    <div className={classes.join(" ")}>
      <textarea
        {...rest}
        className="t--gamma"
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      >
        {children}
      </textarea>

      <span className="character-count t--gamma">
        {characterCount}/{maxCharacterCount}
      </span>
    </div>
  );
};

export default Textarea;
