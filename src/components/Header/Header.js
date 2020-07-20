/*
 * Copyright 2020 Atelier Disko. All rights reserved.
 *
 * Use of this source code is governed by the AD General Software
 * License v1 that can be found under https://atelierdisko.de/licenses
 *
 * This software is proprietary and confidential. Redistribution
 * not permitted. Unless required by applicable law or agreed to
 * in writing, software distributed on an "AS IS" BASIS, WITHOUT-
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 */

import React from "react";
import "./Header.css";

const Header = ({children, resetHandler, className}) => {
  return (
    <header className={className}>
      <span className="h-alpha">
        <a href='/' onClick={event => {
          event.preventDefault();
          resetHandler()
        }}>Sesame</a>
      </span>

      <div>{children}</div>
    </header>
  );
};

export default Header;
