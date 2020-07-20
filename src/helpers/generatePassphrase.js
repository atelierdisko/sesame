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
