import React, { useState } from 'react';
import Form from '../components/form/Form';
import FooterContainer from '../containers/Footer';
import HeaderContainer from '../containers/Header';
import { useDispatch } from 'react-redux';
import { setAuthentication } from '../store/features/auth/authenticationSlice';

function Login() {
  document.body.className = '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await data.json();
    if (result.code !== 202) {
      return setErrors('Something wrong');
    }
    window.localStorage.setItem(
      'auth',
      JSON.stringify({ token: result.data.token, accountId: result.data._id, email: result.data.email })
    );
    dispatch(setAuthentication({ token: result.data.token, accountId: result.data._id, email: result.data.email }));
  };

  return (
    <HeaderContainer
      size="large"
      background="./images/misc/EG-en-20220509-popsignuptwoweeks-perspective_alpha_website_large.jpg"
    >
      <Form>
        <Form.Title>Sign In</Form.Title>
        {error && (
          <Form.Error>
            Sorry, we can't find an account with this email address. Please try again or create a new account.
          </Form.Error>
        )}
        <Form.FormContainer onSubmit={loginHandler}>
          <Form.Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            label="Email or phone number"
          />
          <Form.Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            label="Password"
          />
          <Form.Submit>Sign In</Form.Submit>
        </Form.FormContainer>
        <Form.TextBox>
          <Form.Text>
            New to Netflix? <Form.Link to="/">Sign up now.</Form.Link>
          </Form.Text>
          <Form.SmallText>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
            <Form.Link style={{ color: '#0071eb' }} to="/">
              Learn more.
            </Form.Link>
          </Form.SmallText>
        </Form.TextBox>
      </Form>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
        <FooterContainer mini={true} />
      </div>
    </HeaderContainer>
  );
}

export default Login;
