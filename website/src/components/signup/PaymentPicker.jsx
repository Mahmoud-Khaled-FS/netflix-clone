import React from 'react';
import classes from './styles/steps.module.css';
import Center from './Main';
import LockSvg from '../../svg/Lock';

const PaymentPicker = ({ onSubmit, loading, error }) => {
  const supmitHandler = (e) => {
    if (loading) {
      return;
    }
    e.preventDefault();
    onSubmit();
  };

  return (
    <Center>
      <Center.Step>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <Center.Header align="center">
            <Center.Image className={classes.imageStepThree} />
            <Center.Continer>
              <Center.StepsNumber stepTotal="3" stepNumber="3" />
              <Center.Title>Set up your payment</Center.Title>
            </Center.Continer>
            <Center.Body style={{ maxWidth: 300, marginBottom: 20 }}>
              Your membership starts as soon as you set up payment.
              <Center.Title style={{ fontSize: 18, marginTop: 30 }}>No commitments.</Center.Title>
              <Center.Title style={{ fontSize: 18 }}>Cancel online anytime.</Center.Title>
            </Center.Body>
          </Center.Header>
          <div className={classes.secure}>
            Secure Server <LockSvg />
          </div>
          <div className={loading ? classes.loading : ''}>
            <Center.Form onSubmit={supmitHandler}>
              <div className={classes.payments}>
                <Center.PaymentButton
                  images={[
                    { src: process.env.PUBLIC_URL + '/images/signup/visa-v3.svg', alt: 'visa' },
                    { src: process.env.PUBLIC_URL + '/images/signup/mastercard-v2.svg', alt: 'mastercard' },
                  ]}
                >
                  Credit or Debit Card
                </Center.PaymentButton>
                <Center.PaymentButton
                  images={[{ src: process.env.PUBLIC_URL + '/images/signup/icon_fawry_v3.png', alt: 'fawry' }]}
                >
                  Pay Cash
                </Center.PaymentButton>
              </div>
              {error && <h2 className={classes.error}>Something Wrong!</h2>}
            </Center.Form>
          </div>
        </div>
      </Center.Step>
    </Center>
  );
};
export default PaymentPicker;
