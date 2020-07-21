import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, resetHandler, className }) => {
  let history = useHistory();

  if (!resetHandler) {
    resetHandler = () => history.push("/");
  }

  return (
    <header className={className}>
      <span className="t--alpha">
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
