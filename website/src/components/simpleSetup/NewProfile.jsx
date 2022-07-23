import React from 'react';
import SimpleContainer from './Main';
import classes from './styles/newprofile.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

function NewProfile({ onSubmit }) {
  const auth = useSelector((store) => store.auth);
  let [emailValue, setEmailValue] = useState('');
  useEffect(() => {
    if (auth.email) {
      setEmailValue(auth.email.slice(0, auth.email.indexOf('@')));
    }
  }, []);
  const getProfilesHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const mainProfile = form.getAll('mainProfile')[0];
    const profiles = form.getAll('profile');
    onSubmit(mainProfile, profiles);
  };
  return (
    <SimpleContainer>
      <SimpleContainer.AsideContainer
        title="Who will be watching Netflix?"
        subTitle="People living in your home can enjoy recommendations tailored to their tastes and language preferences. Great for kids. "
        currentStep="2"
        totalSteps="5"
      />
      <SimpleContainer.Content>
        <form className={classes.form} onSubmit={getProfilesHandler}>
          <h2 className={classes.title}>Your profile</h2>
          <ul className={classes.profileList}>
            <li>
              <div className={classes.inputContainer}>
                <div className={classes.input}>
                  <input
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    type="text"
                    id="mainProfile"
                    name="mainProfile"
                  />
                  <label htmlFor="mainProfile">Name</label>
                </div>
              </div>
            </li>
          </ul>
          <h2 className={classes.title}>Add profiles?</h2>
          <ul className={classes.profileList}>
            <li>
              <div className={classes.inputContainer}>
                <div className={classes.input}>
                  <input type="text" id="profile1" name="profile" />
                  <label htmlFor="profile1">Name</label>
                </div>
              </div>
            </li>
            <li>
              <div className={classes.inputContainer}>
                <div className={classes.input}>
                  <input type="text" id="profile2" name="profile" />
                  <label htmlFor="profile2">Name</label>
                </div>
              </div>
            </li>
            <li>
              <div className={classes.inputContainer}>
                <div className={classes.input}>
                  <input type="text" id="profile3" name="profile" />
                  <label htmlFor="profile3">Name</label>
                </div>
              </div>
            </li>
            <li>
              <div className={classes.inputContainer}>
                <div className={classes.input}>
                  <input type="text" id="profile4" name="profile" />
                  <label htmlFor="profile4">Name</label>
                </div>
              </div>
            </li>
          </ul>
          <button className={classes.rule}>
            Only people who live with you may use your account. <span>Learn more.</span>
          </button>
          <SimpleContainer.Button>Next</SimpleContainer.Button>
        </form>
      </SimpleContainer.Content>
    </SimpleContainer>
  );
}

export default NewProfile;
