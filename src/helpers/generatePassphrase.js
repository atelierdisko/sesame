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

const generatePassphrase = (length = 8) => {
  function number() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function character() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  let passphrase = "";

  for (let index = 0; index < length; index++) {
    let generator = Math.random() >= 0.5 ? number : character;

    passphrase += generator();
  }

  return passphrase;
};

export default generatePassphrase;
