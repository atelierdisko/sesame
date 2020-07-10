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
import React, { Fragment, useState } from "react";
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

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [link, setLink] = useState("");
  const [passphrase, setPassphrase] = useState("");

  const maxCharacterCount = 10000;
  const minCharacterCount = 1;

  const copyToClipboard = async () => {
    await clipboard.writeText(link);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = getFormData(event.target);

    if (!formData.passphrase) {
      setPassphrase(generatePassphrase());
    }

    try {
      const cipher = AES.encrypt(
        formData.secret,
        formData.passphrase
      ).toString();

      const response = await axios.post(`/api/secret`, {
        secret: cipher,
        lifetime: formData.lifetime,
      });

      if (typeof window !== undefined) {
        setLink(`${window.location.origin}/reveal/${response.data.hash}`);
      }
    } catch (error) {
      console.error(error);
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
          <form onSubmit={(event) => handleSubmit(event)}>
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
                onChange={(event) => setPassphrase(event.target.value)}
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
              isDisabled={characterCount < minCharacterCount}
            >
              Generate Secret Link
            </Button>
          </form>
        </div>
      ) : (
        <div className="content content--share">
          <span>
            <div className="link">
              {link}

              <br />
              <br />
              <span className="link__passphrase">Passphrase: {passphrase}</span>
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
