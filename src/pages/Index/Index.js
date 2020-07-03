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

import React, {Fragment, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Button from '../../components/Button/Button';
import Textarea from '../../components/Textarea/Textarea';
import Select from '../../components/Select/Select';
import useForm from "../../hooks/useForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import "./Index.css";
import useCopyClipboard from "react-use-clipboard";

const Index = () => {
  const {handleSubmit} = useForm();

  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [characterCount, setCharacterCount] = useState(0);
  const [secret, setSecret] = useState(null);

  const passphraseField = useRef(null);
  const [isCopied, setCopied] = useCopyClipboard(secret ? secret.link : null);

  const passphraseAutoLength = 6;
  const maxCharacterCount = 10000;
  const minCharacterCount = 1;

  useEffect(() => {
    if (characterCount >= minCharacterCount) {
      setSubmitDisabled(false)
    }

  }, [characterCount]);

  const onTextareaChange = (event) => {
    setCharacterCount(event.target.value.length)
  };

  const generatePassphrase = () => {
    if (!passphraseField.current) {
      return
    }

    function number() {
      return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    function character() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    let passphrase = '';

    for (let length = 0; length < passphraseAutoLength; length++) {

      let generator = Math.random() >= 0.5 ? number : character;

      passphrase += generator();
    }

    passphraseField.current.value = passphrase;

    return passphrase;
  };

  const onSubmit = async data => {
    if (!data.passphrase) {
      data.passphrase = generatePassphrase();
    }

    setLoading(true);

    try {
      const {data: secret} = await axios.post(`/api/secret`, data);

      secret.passphrase = data.passphrase;

      if (typeof window !== undefined) {
        secret.link = `${window.location.origin}/secret/${secret.hash}`;
      }

      setSecret(secret);

    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header>
        <span className='t-beta'>Damit Dinge die geheim sind, auch geheim bleiben</span>
        <br/>

        <h2 className='h-beta'>Verschlüssele Deine Nachrichten, Links oder Passwörter und versende diese mit einem
          geheimen Link.</h2>
      </Header>

      {!secret ? (
        <div className='content content--index'>
          <form onSubmit={event => handleSubmit(event, onSubmit)}>
            <Textarea name='secret' id='secret'
                      placeholder='Your Super Secret Content goes here...'
                      characterCount={characterCount}
                      maxCharacterCount={maxCharacterCount}
                      onChange={(event) => onTextareaChange(event)} required/>

            <div className='options'>
              <Label for='passphrase'>
                Wähle ein sicheres Passwort zum Entschlüsseln oder <span className='generate-passphrase'
                                                                         onClick={() => generatePassphrase()}>generiere eins</span>
              </Label>

              <Input type='text' ref={passphraseField} name='passphrase' id='passphrase'/>

              <Select name='lifetime' id='lifetime' required>
                <option value='7 days' selected='selected'>7 days</option>
                <option value='1 day'>1 day</option>
              </Select>
            </div>

            <Button type='submit' isPrimary={true} isLoading={loading} isDisabled={submitDisabled}>
              Generate Secret Link
            </Button>
          </form>
        </div>
      ) : (
        <div className='content content--share'>
          <span>
            <Textarea>{secret.link}</Textarea>

            <div className='passphrase'>
             <span>
                <Label for='passphrase'>Passphrase</Label>
                <Input type='text' name='passphrase' id='passphrase' value={secret.passphrase} readonly/>
             </span>
            </div>

            <Button type='submit' isPrimary={true} onClick={() => setCopied('oinkoink')}>
              Link kopieren
            </Button>
          </span>
        </div>
      )}

      <Footer/>
    </Fragment>
  )
};

export default Index