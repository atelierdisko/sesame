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

import React, {useEffect, useState, Fragment} from "react";
import {Link, useParams} from "react-router-dom";
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
import getFormData from "../../helpers/getFormData";

const Reveal = () => {
  let {hash} = useParams();

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
      const {data} = await axios.get(`${process.env.REACT_APP_API_HOST}/api/secret/${hash}`);
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

    console.log(secret, passphrase, decrypted);

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
      await axios.get(`${process.env.REACT_APP_API_HOST}/api/secret/${hash}/exists`);
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
        <Header/>

        <div className="content content--fetching">
          <h2 className="h-beta">Fetching secret…</h2>
        </div>

        <Footer/>
      </Fragment>
    );
  }

  if (!exists) {
    return (
      <Fragment>
        <Header/>

        <div className="content content--removed">
          <h2 className="h-beta">
            Tatsache! Hier gibt es nichts zu sehen, denn die Nachricht würde
            gelöscht. Für immer. Ehrenwort. Gehe direkt auf{" "}
            <Link to="/">Start</Link>, nicht über Los und zieh nicht nach
            Pinneberg.
          </h2>
        </div>

        <Footer/>
      </Fragment>
    );
  }

  if (secret && !passphraseError) {
    return (
      <Fragment>
        <Header>
          <h2 className="h-beta">
            Et voilà —<br/>
            Open Sesame.
          </h2>
        </Header>

        <div className="content content--revealed">
          <Textarea>{secret}</Textarea>
        </div>

        <Footer/>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header>
        <h2 className="h-beta">
          Du benötigst ein gültiges Passwort zum lesen dieser Nachricht. Die
          Nachricht wird Dir nur einmal angezeigt und im Anschluß gelöscht. Für
          immer.
        </h2>
      </Header>

      <div className="content content--reveal">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div
            className={`passphrase ${
              passphraseError ? "passphrase--error" : ""
            }`}
          >
            <span>
              <Label htmlFor="passphrase">
                {passphraseError ? "Passphrase ungültig" : "Passphrase"}
              </Label>
              <Input
                type="text"
                name="passphrase"
                id="passphrase"
                onChange={(event) => setPassphrase(event.target.value)}
              />
            </span>
          </div>

          <Button type="submit" isDisabled={loading || !passphrase}>
            Nachricht entschlüsseln
          </Button>
        </form>
      </div>

      <Footer/>
    </Fragment>
  );
};

export default Reveal;
