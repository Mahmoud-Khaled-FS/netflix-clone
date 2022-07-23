import React, { useEffect, useReducer } from 'react';
import { isEmail } from '../../helper/validation';
// import classes from './styles/steps.module.css';
import Center from './Main';

const initForm = {
  password: { value: '', error: null, isValid: false },
  email: { value: '', error: null, isValid: false },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'PASSWORD':
      if (action.value.trim().length === 0) {
        return {
          email: state.email,
          password: { error: 'Password is required!', value: action.value, isValid: false },
        };
      }
      if (action.value.trim().length < 6) {
        return {
          email: state.email,
          password: { error: 'Password should be between 6 and 60 characters', value: action.value, isValid: false },
        };
      }
      return { email: state.email, password: { error: null, value: action.value, isValid: true } };
    case 'EMAIL':
      const isValid = isEmail(action.value);
      if (isValid.hasError) {
        return {
          email: { error: isValid.errorMessage, value: action.value, isValid: false },
          password: state.password,
        };
      } else if (!isValid.hasError) {
        return { password: state.password, email: { value: action.value, isValid: true, error: null } };
      }
      return;
    default:
      return;
  }
};

const RegForm = ({ onSubmit, index, email }) => {
  const [form, dispatch] = useReducer(reducer, initForm);
  useEffect(() => {
    if (email) {
      dispatch({ type: 'EMAIL', value: email });
    }
  }, []);
  const getPasswordHandler = (e) => {
    dispatch({ type: 'PASSWORD', value: e.target.value });
  };
  const getEmailHandler = (e) => {
    dispatch({ type: 'EMAIL', value: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.email.isValid && !form.password.isValid) {
      return;
    }
    onSubmit({ email: form.email.value, password: form.password.value });
  };
  return (
    <Center>
      <Center.Step>
        <Center.Form onSubmit={submitHandler}>
          <Center.Header style={{ maxWidth: 440, paddingTop: 10 }}>
            <Center.Continer>
              <Center.StepsNumber stepTotal="3" stepNumber={index} />
              <Center.Title>Create a password to start your membership</Center.Title>
            </Center.Continer>
            <Center.Body style={{ display: 'block' }}>Just a few more steps and you're done!</Center.Body>
            <Center.Body style={{ display: 'block' }}>We hate paperwork, too.</Center.Body>
          </Center.Header>
          <Center.Header style={{ maxWidth: 440, paddingTop: 10 }}>
            <Center.Input
              value={form.email.value}
              onChange={getEmailHandler}
              isValid={form.email.isValid}
              error={form.email.error}
              label="Email"
              id="email"
              type="email"
            />
            <Center.Input
              value={form.password.value}
              onChange={getPasswordHandler}
              error={form.password.error ? form.password.error : null}
              label="Add a password"
              id="password"
              type="password"
              isValid={form.password.isValid}
            />
          </Center.Header>
          <Center.Button type="submit" style={{ maxWidth: 440 }}>
            Next
          </Center.Button>
        </Center.Form>
      </Center.Step>
    </Center>
  );
};
export default RegForm;
