import React, { useEffect, useState, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Label from "../../components/Label/Label";
import Input from "../../components/Input/Input";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import "./Reveal.css";
import Textarea from "../../components/Textarea/Textarea";
import { messages } from "../../messages";

const Reveal = () => {
  let { hash } = useParams();

  const [loading, setLoading] = useState(true);

  const [passphrase, setPassphrase] = useState(null);
  const [passphraseError, setPassphraseError] = useState(false);

  const [exists, setExists] = useState(true);
  const [secret, setSecret] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if secret was fetched already try to re-decrypt it and exit
    if (secret) {
      decrypt(secret, passphrase);

      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`/api/secret/${hash}`);
      decrypt(data.secret, passphrase);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const decrypt = (secret, passphrase) => {
    const decrypted = AES.decrypt(secret, passphrase).toString(
      CryptoJS.enc.Utf8
    );

    if (!decrypted) {
      setPassphraseError(true);
      setSecret(secret);
    } else {
      setPassphraseError(false);
      setSecret(decrypted);
    }
  };

  const checkToken = async () => {
    setLoading(true);

    try {
      await axios.get(`/api/secret/${hash}/exists`);
      setExists(true);
    } catch (error) {
      setExists(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (!secret && loading) {
    return (
      <Fragment>
        <Header />

        <div className="content content--fetching">{/* loader ? */}</div>

        <Footer />
      </Fragment>
    );
  }

  if (!exists) {
    return (
      <Fragment>
        <Header />

        <div className="content content--removed">
          <h2 className="t--beta">
            {messages.notFoundHeaderTitle}

            <br />
            <br />
            <Link to="/">{messages.homeLinkLabel}</Link>
          </h2>
        </div>
        <Footer />
      </Fragment>
    );
  }

  if (secret && !passphraseError) {
    return (
      <Fragment>
        <Header className="header--revealed">
          <h2 className="t--beta">{messages.revealedHeaderTitle}</h2>
        </Header>

        <div className="content content--revealed">
          <Textarea value={secret} autoFocus={true} readOnly></Textarea>
        </div>

        <Footer />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header>
        <h2 className="t--beta">{messages.revealHeaderTitle}</h2>
      </Header>

      <div className="content content--reveal">
        <form
          onSubmit={(event) => handleSubmit(event)}
          autoComplete="off"
        >
          <div
            className={`passphrase ${
              passphraseError ? "passphrase--error" : ""
            }`}
          >
            <span>
              <Label htmlFor="passphrase">
                {passphraseError
                  ? messages.invalidPassphraseMessage
                  : "Passphrase"}
              </Label>

              <Input
                defaultValue={passphrase}
                type="password"
                name="passphrase"
                id="passphrase"
                onChange={(event) => setPassphrase(event.target.value)}
                autoComplete="one-time-code"
                autoFocus={true}
              />
            </span>
          </div>

          <Button
            type="submit"
            isPrimary={true}
            isDisabled={loading || !passphrase}
          >
            {messages.decryptButton}
          </Button>
        </form>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Reveal;
