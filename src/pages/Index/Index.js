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

import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import Textarea from "../../components/Textarea/Textarea";
import Select from "../../components/Select/Select";
import useForm from "../../hooks/useForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import AES from "crypto-js/aes";
import * as clipboard from "clipboard-polyfill";
import "./Index.css";

const Index = () => {
  const { handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [characterCount, setCharacterCount] = useState(0);
  const [link, setLink] = useState(null);
  const [passphrase, setPassphrase] = useState(null);

  const passphraseField = useRef(null);

  const passphraseAutoLength = 6;
  const maxCharacterCount = 10000;
  const minCharacterCount = 1;

  useEffect(() => {
    if (characterCount >= minCharacterCount) {
      setSubmitDisabled(false);
    }
  }, [characterCount]);

  useEffect(() => {
    if (passphraseField.current) {
      passphraseField.current.value = passphrase;
    }
  }, [passphrase]);

  const onTextareaChange = (event) => {
    setCharacterCount(event.target.value.length);
  };

  const copyToClipboard = async () => {
    await clipboard.writeText(link);
  };

  const generatePassphrase = () => {
    function number() {
      return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    function character() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    let passphrase = "";

    for (let length = 0; length < passphraseAutoLength; length++) {
      let generator = Math.random() >= 0.5 ? number : character;

      passphrase += generator();
    }

    return passphrase;
  };

  const onSubmit = async (data) => {
    setPassphrase(data.passphrase ? data.passphrase : generatePassphrase());

    setLoading(true);

    try {
      const cipher = AES.encrypt(data.secret, data.passphrase).toString();

      const response = await axios.post(`/api/secret`, {
        secret: cipher,
        lifetime: data.lifetime,
      });

      if (typeof window !== undefined) {
        setLink(`${window.location.origin}/reveal/${response.data.hash}`);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header>
        <span className="t-beta">
          Damit Dinge die geheim sind, auch geheim bleiben
        </span>

        <h2 className="h-beta">
          Verschlüssele Deine Nachrichten, Links oder Passwörter und versende
          diese mit einem geheimen Link.
        </h2>
      </Header>

      {!link ? (
        <div className="content content--index">
          <form onSubmit={(event) => handleSubmit(event, onSubmit)}>
            <Textarea
              name="secret"
              id="secret"
              placeholder="Your Super Secret Content goes here..."
              characterCount={characterCount}
              maxCharacterCount={maxCharacterCount}
              onChange={(event) => onTextareaChange(event)}
              required
            />

            <div className="options">
              <Label htmlFor="passphrase">
                Wähle ein sicheres Passwort zum Entschlüsseln oder{" "}
                <span
                  className="generate-passphrase"
                  onClick={() => setPassphrase(generatePassphrase())}
                >
                  generiere eins
                </span>
              </Label>

              <Input
                type="text"
                ref={passphraseField}
                name="passphrase"
                id="passphrase"
              />

              <Select
                name="lifetime"
                id="lifetime"
                required
                defaultValue="1 day"
              >
                <option value="7 days">7 days</option>
                <option value="1 day">1 day</option>
              </Select>
            </div>

            <Button
              type="submit"
              isPrimary={true}
              isLoading={loading}
              isDisabled={submitDisabled}
            >
              Generate Secret Link
            </Button>
          </form>
        </div>
      ) : (
        <div className="content content--share">
          <span>
            <Textarea readOnly>{link}</Textarea>

            <div className="passphrase">
              <span>
                <Label htmlFor="passphrase">Passphrase</Label>
                <Input
                  type="text"
                  name="passphrase"
                  id="passphrase"
                  value={passphrase}
                  readOnly
                />
              </span>
            </div>

            <Button
              type="submit"
              isPrimary={true}
              onClick={() => copyToClipboard()}
            >
              Link kopieren
            </Button>
          </span>
        </div>
      )}

      <Footer />
    </Fragment>
  );
};

export default Index;
