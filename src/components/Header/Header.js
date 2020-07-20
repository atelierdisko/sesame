import React from "react";
import "./Header.css";

const Header = ({ children, resetHandler, className }) => {
  return (
    <header className={className}>
      <span className="h-alpha">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            resetHandler();
          }}
        >
          Sesame
        </a>
      </span>

      <div>{children}</div>
    </header>
  );
};

export default Header;
