import React from 'react';
import classes from './styles/steps.module.css';
import Center from './Main';
import { useNavigate } from 'react-router-dom';
const Registration = ({ index }) => {
  const navigate = useNavigate();
  const goNextHandler = () => {
    navigate('/signup/regform');
  };
  return (
    <Center>
      <Center.Step>
        <Center.Header align="center">
          <Center.Image className={classes.imageStepOne} />
          <Center.Continer>
            <Center.StepsNumber stepTotal="3" stepNumber={index} />
            <Center.Title style={{ fontWeight: 500 }}>Finish setting up your account</Center.Title>
          </Center.Continer>
          <Center.Body style={{ maxWidth: 300 }}>
            Netflix is personalized for you. Create a password to watch on any device at any time.
          </Center.Body>
        </Center.Header>
        <Center.Button onClick={goNextHandler}>Next</Center.Button>
      </Center.Step>
    </Center>
  );
};
export default Registration;
