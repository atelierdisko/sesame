import React, {useState} from "react";
import "./Textarea.css";
import classNames from "classnames";

const Textarea = ({
                    isPrimary,
                    children,
                    characterCount,
                    maxCharacterCount,
                    className,
                    ...rest
                  }) => {
  const [focused, setFocused] = useState(false);

  const textareaClasses = classNames(
    "textarea",
    className,
    {"textarea--focused": focused}
  );

  return (
    <div className={textareaClasses}>
      <textarea
        {...rest}
        className="textarea__inner t--gamma"
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      >
        {children}
      </textarea>

      <span className="textarea__character-count t--gamma">
        {characterCount}/{maxCharacterCount}
      </span>
    </div>
  );
};

export default Textarea;
