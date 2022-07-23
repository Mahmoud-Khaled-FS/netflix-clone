import React, { useState } from 'react';
import Devicesurvey from '../components/simpleSetup/Devicesurvey';
import HeaderContainer from '../containers/Header';
import FooterContainer from '../containers/Footer';
import NewProfile from '../components/simpleSetup/NewProfile';
import SecondaryLanguages from '../components/simpleSetup/SecondaryLanguages';
import Onramp from '../components/simpleSetup/Onramp';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/UI/loading/loading';
import { useDispatch, useSelector } from 'react-redux';
import { finishSetup, setUser } from '../store/features/auth/authenticationSlice';

function SimpleSetup() {
  document.body.className = 'light';
  const navigator = useNavigate();
  const auth = useSelector((store) => store.auth);
  const location = useLocation();
  const [devices, setDevices] = useState([]);
  const [mainProfile, setMainProfile] = useState('');
  const [otherProfiles, setOtherProfiles] = useState([]);
  const [secondaryLanguages, setSecondaryLanguages] = useState([]);
  const [onramp, setOnramp] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const devicesurveyHandler = (data) => {
    setDevices(data);
    navigator('/simpleSetup/newProfile');
  };
  const newProfileHandler = (main, other) => {
    setMainProfile(main);
    setOtherProfiles(other);
    navigator('/simpleSetup/secondaryLanguages');
  };
  const secondaryLanguagesHandler = (secondaryLanguages) => {
    setSecondaryLanguages(secondaryLanguages);
    navigator('/simpleSetup/onramp');
  };
  const onrampHandler = async (onrampData) => {
    // onramp = [...onrampData];
    setLoading(true);
    setOnramp(onrampData);
    console.log({
      'users-names': [mainProfile, ...otherProfiles],
      token: auth.token,
    });
    const result = await fetch(`http://localhost:8080/user/create-new-users?token=${auth.token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'users-names': [mainProfile, ...otherProfiles],
      }),
    });
    const data = await result.json();
    const userId = data.data.find((user) => user.name === mainProfile);
    // console.log(userId);
    dispatch(setUser(userId.userId));
    navigator('/browse');
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <HeaderContainer
        headerStyle={{ margin: 0 }}
        size="large"
        style={{ borderBottom: '1px solid #e6e6e6', maxWidth: 984, margin: '0 auto' }}
        login={true}
        loginStyle="link"
      />
      <SwitchTransition mode="out-in">
        <CSSTransition key={location.key} classNames="move" timeout={300}>
          <Routes location={location}>
            <Route path="/devicesurvey" element={<Devicesurvey onSubmit={devicesurveyHandler} />} />
            <Route path="/newProfile" element={<NewProfile rofile onSubmit={newProfileHandler} />} />
            <Route path="/secondaryLanguages" element={<SecondaryLanguages onSubmit={secondaryLanguagesHandler} />} />
            <Route path="/onramp" element={<Onramp profileName={mainProfile} onSubmit={onrampHandler} />} />
            <Route path="/" element={<Navigate to="/simpleSetup/devicesurvey" />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
      <FooterContainer mini={true} align="left" style={{ backgroundColor: '#f3f3f3' }} />
    </div>
  );
}

export default SimpleSetup;
