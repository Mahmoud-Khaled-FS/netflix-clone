import React, { useState } from 'react';
import GsForm from '../components/gsForm/GsForm';
import { isEmail } from '../helper/validation';
import { useNavigate } from 'react-router-dom';

function GetStartedContainer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getValueInputHandler = (e) => {
    setEmail(e.target.value);
    const isValid = isEmail(e.target.value);
    if (isValid.hasError) {
      return setError(isValid.errorMessage);
    }
    return setError(null);
  };
  const signupHandler = (e) => {
    e.preventDefault();
    if (error || email.trim().length === 0) return;
    document.cookie = 'email=' + email;
    navigate('/signup/registration');
  };
  return (
    <GsForm>
      <GsForm.Title>Ready to watch? Enter your email to create or restart your membership.</GsForm.Title>
      <GsForm.Form onSubmit={signupHandler}>
        <GsForm.Input
          error={error ? true : false}
          onChange={getValueInputHandler}
          value={email}
          id="email"
          label="Email address"
          type="email"
        />
        <GsForm.Button type="submit">Get Started</GsForm.Button>
        <GsForm.Break />
        {error && <GsForm.Error>{error}</GsForm.Error>}
      </GsForm.Form>
    </GsForm>
  );
}

export default GetStartedContainer;
