import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PaymentPicker from '../components/signup/PaymentPicker';
import PlanForm from '../components/signup/PlanForm';
import RegForm from '../components/signup/RegForm';
import Registration from '../components/signup/Registration';
import SignupHome from '../components/signup/SignupHome';
import FooterContainer from '../containers/Footer';
import HeaderContainer from '../containers/Header';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { setAuthentication, startSetup } from '../store/features/auth/authenticationSlice';

function Signup() {
  const [data, setData] = useState({ email: null, password: null, plan: null });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // console.log(location);
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const emailIndex = cookies.findIndex((cookie) => cookie.includes('email'));
    if (emailIndex === -1) {
      return;
    }
    const email = cookies[emailIndex].split('=')[1];
    setData((prev) => {
      return { ...prev, email: email };
    });
  }, []);
  // console.log(data);
  document.body.className = 'light';
  const getRegFormHandler = (form) => {
    data.email = form.email;
    data.password = form.password;
    if (data.plan) {
      return navigator('/signup/paymentpicker');
    }
    return navigator('/signup/');
    // console.log(data);
  };
  const getPlanHandler = (plan) => {
    data.plan = plan;
    if (data.email) {
      return navigator('/signup/paymentpicker');
    }
    return navigator('/signup/registration');
    // console.log(data);
  };
  const signUpHandler = async () => {
    setLoading(true);
    const result = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        plan: data.plan,
      }),
    });
    const dataR = await result.json();
    setLoading(false);
    if (dataR.code !== 202) {
      return setError(true);
    }
    // console.log(dataR);
    dispatch(setAuthentication({ token: dataR.data.token, accountId: dataR.data._id, email: dataR.data.email }));
    dispatch(startSetup());
    window.localStorage.setItem(
      'auth',
      JSON.stringify({ token: dataR.data.token, accountId: dataR.data._id, email: dataR.data.email })
    );
    return navigator('/simpleSetup');
  };
  return (
    <>
      <HeaderContainer size="large" style={{ borderBottom: '1px solid #e6e6e6' }} login={true} loginStyle="link" />
      <SwitchTransition mode="out-in">
        <CSSTransition key={location.key} classNames="move" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<SignupHome index={data.email ? '2' : '1'} />} />
            <Route path="/registration" element={<Registration index={data.email ? '1' : '2'} />} />
            <Route
              path="/regform"
              element={<RegForm email={data.email} onSubmit={getRegFormHandler} index={data.email ? '1' : '2'} />}
            />
            <Route path="/planform" element={<PlanForm onSubmit={getPlanHandler} index={data.email ? '2' : '1'} />} />
            <Route
              path="/paymentpicker"
              element={
                data.email && data.password && data.plan ? (
                  <PaymentPicker onSubmit={signUpHandler} error={error} loading={loading} />
                ) : (
                  <Navigate to={data.email ? '/signup/registration' : '/signup'} />
                )
              }
            />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
      <FooterContainer mini={true} align="left" style={{ backgroundColor: '#f3f3f3' }} />
    </>
  );
}

export default Signup;
