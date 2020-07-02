import React, {Fragment, useState} from 'react';
import axios from 'axios';
import Button from '../components/Button/Button';
import Textarea from '../components/Textarea/Textarea';
import Select from '../components/Select/Select';
import Label from "../components/Label/Label";
import useForm from "../hooks/useForm";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Create = () => {
  const {handleSubmit} = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    setLoading(true);
    await axios.post(`${process.env.REACT_APP_API_HOST}/secret`, data);

    setLoading(false);
  };

  return (
    <Fragment>
      <Header title='Share your secrets'/>

      <form onSubmit={event => handleSubmit(event, onSubmit)}>

        <Label for='secret'>Secret</Label>
        <Textarea name='secret' id='secret' required/>

        <Label for='lifetime'>Lifetime</Label>

        <Select name='lifetime' id='lifetime' required>
          <option value='7 days' selected='selected'>7 days</option>
          <option value='1 day'>1 day</option>
        </Select>

        <Button type='submit' isPrimary={true} isLoading={loading}>Create secret</Button>
      </form>

      <Footer/>
    </Fragment>
  )
};

export default Create