import React, {useEffect, useState, Fragment} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Button from "../components/Button/Button";

const Reveal = () => {
  let {token} = useParams();

  const [secret, setSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(null);
  const [requiresPassphrase, setRequiresPassphrase] = useState(null);

  const checkToken = async () => {
    try {
      const {data} = await axios.get(`/api/secret/${token}/exists`);

      setRequiresPassphrase(data.requiresPassphrase);
      setExists(true);
    } catch (error) {
      setExists(false);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const revealSecret = async () => {
    setLoading(true);

    try {
      const {data: {secret}} = await axios.get(`/api/secret/${token}`);
      setSecret(secret);
    } catch (error) {

    } finally {
      setLoading(false)
    }
  };

  return (
    <Fragment>
      <h1>Secret</h1>

      {loading && (
        <em>Loading</em>
      )}

      {secret && (
        <textarea>
          {secret}
        </textarea>
      )}

      {(exists && !secret) && (
        <Button onClick={() => revealSecret()}>View secret</Button>
      )}

      {exists === false && (
        <p>Secret not found</p>
      )}
    </Fragment>
  )
};

export default Reveal