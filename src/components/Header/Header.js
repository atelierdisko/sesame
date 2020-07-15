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
import { Link } from "react-router-dom";

const Header = ({ children }) => {
  return (
    <header>
      <Link to={"/"} className="h-alpha">
        Sesame
      </Link>

      <div>{children}</div>
    </header>
  );
};

export default Header;
