import React from 'react';
import classes from './styles/steps.module.css';
import Center from './Main';
import MarkSvg from '../../svg/Mark';
import { useNavigate } from 'react-router-dom';

const SignupHome = ({ index }) => {
  // console.log(index);
  const navigate = useNavigate();
  const goNextHandler = () => {
    navigate('/signup/planform');
  };
  return (
    <Center>
      <Center.Step>
        <Center.Header align="center">
          <Center.Image className={classes.imageStepTwo} />
          <Center.Continer>
            <Center.StepsNumber stepTotal="3" stepNumber={index} />
            <Center.Title>Choose your plan.</Center.Title>
          </Center.Continer>
          <Center.Body style={{ maxWidth: 300 }}>
            <ul className={classes.listCheckmark}>
              <li>
                <MarkSvg color="#e50914" />
                <span>No commitments, cancel anytime.</span>
              </li>
              <li className={classes.listMargin}>
                <MarkSvg color="#e50914" />
                <span>Everything on Netflix for one low price.</span>
              </li>
              <li className={classes.listMargin}>
                <MarkSvg color="#e50914" />
                <span>Unlimited viewing on all your devices.</span>
              </li>
            </ul>
          </Center.Body>
        </Center.Header>
        <Center.Button onClick={goNextHandler}>Next</Center.Button>
      </Center.Step>
    </Center>
  );
};
export default SignupHome;
