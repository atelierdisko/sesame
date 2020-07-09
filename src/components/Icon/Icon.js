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
import { ReactComponent as Down } from "./icons/down.svg";
import { ReactComponent as Right } from "./icons/right.svg";

const icons = {
  down: <Down />,
  right: <Right />,
};

const Icon = ({ name }) => {
  const classes = ["icon"];
  classes.push(`icon--${name}`);

  return <span className={classes.join(" ")}>{icons[name]}</span>;
};

export default Icon;
