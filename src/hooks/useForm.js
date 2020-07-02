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
