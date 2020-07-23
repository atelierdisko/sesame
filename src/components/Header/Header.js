import React from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import "./Header.css";

const Header = ({ children, resetHandler, className }) => {
  let history = useHistory();

  if (!resetHandler) {
    resetHandler = () => history.push("/");
  }

  return (
    <header className={classNames("header", className)}>
      <span className="header__title t--alpha">
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

      <div className="header__info header-info">{children}</div>
    </header>
  );
};

export default Header;
