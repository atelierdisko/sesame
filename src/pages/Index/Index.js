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
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import Textarea from "../../components/Textarea/Textarea";
import Select from "../../components/Select/Select";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import AES from "crypto-js/aes";
import * as clipboard from "clipboard-polyfill";
import getFormData from "../../helpers/getFormData";
import generatePassphrase from "../../helpers/generatePassphrase";
import "./Index.css";

const DeleteButton = ({ hash, ...rest }) => {
  return (
    <Button isDangerous={true} indicator={false} {...rest}>
      Löschen
    </Button>
  );
};

const CopyButton = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await clipboard.writeText(link);
    setCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button isPrimary={true} onClick={() => copyToClipboard()}>
      {copied ? "Kopiert!" : "Link kopieren"}
    </Button>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [passphrase, setPassphrase] = useState("");
  const [secret, setSecret] = useState(null);

  const maxCharacterCount = 10000;
  const minCharacterCount = 1;

  const handleCreation = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = getFormData(event.target);

    if (!formData.passphrase) {
      formData.passphrase = generatePassphrase();
    }

    try {
      const cipher = AES.encrypt(
        formData.secret,
        formData.passphrase
      ).toString();

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/secret`,
        {
          secret: cipher,
          lifetime: formData.lifetime,
        }
      );

      setPassphrase(formData.passphrase);
      setSecret(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletion = async () => {
    await axios.delete(
      `${process.env.REACT_APP_API_HOST}/api/secret/${secret.hash}`
    );
    setSecret(null);
    setPassphrase("");
  };

  const getLink = () => {
    if (typeof window !== undefined) {
      return `${window.location.origin}/reveal/${secret.hash}`;
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

      {!secret ? (
        <div className="content content--index">
          <form onSubmit={(event) => handleCreation(event)}>
            <Textarea
              name="secret"
              id="secret"
              placeholder="Your Super Secret Content goes here..."
              characterCount={characterCount}
              maxCharacterCount={maxCharacterCount}
              onChange={(event) => setCharacterCount(event.target.value.length)}
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
                value={passphrase}
                onChange={(event) =>
                  setPassphrase(event.target.value.replace(/[^0-9a-z]/gi, ""))
                }
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
                <option value="8 hours">8 hours</option>
                <option value="2 hours">2 hours</option>
                <option value="1 hour">1 hour</option>
                <option value="10 minutes">10 minutes</option>
              </Select>
            </div>

            <Button
              type="submit"
              isPrimary={true}
              isLoading={loading}
              isDisabled={characterCount < minCharacterCount}
            >
              Generate Secret Link
            </Button>
          </form>
        </div>
      ) : (
        <div className="content content--share">
          <div className="link">
            <span className="link__url">{getLink()}</span>
            <span className="link__passphrase">
              <span className="passphrase-note t-beta">
                Passphrase nicht vergessen:
              </span>
              <br />
              {passphrase}
            </span>
          </div>

          <div className="actions">
            <DeleteButton onClick={() => handleDeletion()} />
            <CopyButton link={getLink()} />
          </div>
        </div>
      )}

      <Footer />
    </Fragment>
  );
};

export default Index;
