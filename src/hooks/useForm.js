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

import {useState} from "react";

const useForm = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (event, callback) => {
    event.preventDefault();

    const data = {};

    for (let [key, value] of new FormData(event.target).entries()) {
      data[key] = value
    }

    setFormData(data);
    callback(data);
  };

  return {formData, handleSubmit};
};

export default useForm;
