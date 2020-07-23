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
import { messages } from "../../messages";
import "./Index.css";

const DeleteButton = ({ hash, ...rest }) => {
  return (
    <Button isDangerous={true} indicator={false} {...rest}>
      Delete
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
      {copied ? "Copied!" : "Copy"}
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [secret]);

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

      const { data } = await axios.post(`/api/secret`, {
        secret: cipher,
        lifetime: formData.lifetime,
      });

      setPassphrase(formData.passphrase);
      setSecret(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSecret(null);
    setPassphrase("");
  };

  const handleDeletion = async () => {
    await axios.delete(`/api/secret/${secret.hash}`);
    reset();
  };

  const getLink = () => {
    if (typeof window !== undefined) {
      return `${window.location.origin}/reveal/${secret.hash}`;
    }
  };

  if (!secret) {
    return (
      <Fragment>
        <Header resetHandler={reset} className="header">
          <span className="t--delta header-info__subtitle">
            {messages.createHeaderSubTitle}
          </span>

          <h2 className="t--beta header-info__title">
            {messages.createHeaderTitle}
          </h2>
        </Header>

        <main className="content content--index">
          <form
            className="secret-form secret-form--index"
            onSubmit={(event) => handleCreation(event)}
          >
            <Textarea
              name="secret"
              id="secret"
              className="textarea--index"
              placeholder={messages.secretPlaceholder}
              characterCount={characterCount}
              maxCharacterCount={maxCharacterCount}
              onChange={(event) => setCharacterCount(event.target.value.length)}
              required
            />

            <div className="secret-form__options secret-form-options secret-form-options--index">
              <Label
                htmlFor="passphrase"
                className="secret-form-options__label secret-form-options-label"
              >
                {messages.generatePassphraseLabel}{" "}
                <span
                  className="secret-form-options-label__generator secret-form-options-label__generator--index"
                  onClick={() => setPassphrase(generatePassphrase())}
                >
                  {messages.generatePassphraseButton}
                </span>
              </Label>

              <Input
                className="secret-form-options__input secret-form-options__input--index"
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
              {messages.getLinkButton}
            </Button>
          </form>
        </main>

        <Footer />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header resetHandler={reset} className="header header--share">
        <span className="t--delta">{messages.shareHeaderSubTitle}</span>

        <h2 className="t--beta">{messages.shareHeaderTitle}</h2>
      </Header>

      <main className="content content--share">
        <div className="content__url">
          <span className="t--delta">{messages.shareLinkLabel}:</span>
          <br />
          <span className="t--beta">
            <mark>{getLink()}</mark>
          </span>
        </div>

        <span className="content__passphrase content-passphrase">
          <span className="content-passphrase__note t--delta">
            {messages.sharePassphraseLabel}:
          </span>
          <br />
          <span className="t--beta">{passphrase}</span>
        </span>

        <div className="content__actions">
          <DeleteButton onClick={() => handleDeletion()} />
          <CopyButton link={getLink()} />
        </div>
      </main>

      <Footer />
    </Fragment>
  );
};

export default Index;
