const getFormData = (target) => {
  const formData = {};

  for (let [key, value] of new FormData(target).entries()) {
    formData[key] = value;
  }

  return formData;
};

export default getFormData;
