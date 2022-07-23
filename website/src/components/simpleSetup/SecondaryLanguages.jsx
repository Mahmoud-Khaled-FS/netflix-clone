import React from 'react';
import SimpleContainer from './Main';
import classes from './styles/secondarylanguages.module.css';
import languages from './../../fixtures/languages.json';
function SecondaryLanguages({ onSubmit }) {
  const getLanguagesHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const languages = form.getAll('lan');
    onSubmit(languages);
  };
  return (
    <SimpleContainer>
      <SimpleContainer.AsideContainer
        title="Which languages do you like to watch shows and movies in?"
        subTitle="Letting us know helps set up your audio and subtitles. "
        boldSubTitle="You can always change these."
        currentStep="4"
        totalSteps="5"
      />
      <SimpleContainer.Content>
        <form onSubmit={getLanguagesHandler} className={classes.form}>
          <h2 className={`${classes.header} ${classes.inputCheck}`}>
            <span>English</span>
          </h2>
          <ul className={classes.languages}>
            {languages.map((lan, index) => {
              return (
                <li key={index}>
                  <div className={classes.lan}>
                    <input type="checkbox" name="lan" value={lan} id={lan} />
                    <label htmlFor={lan}>{lan}</label>
                  </div>
                </li>
              );
            })}
          </ul>
          <SimpleContainer.FixedButton>Next</SimpleContainer.FixedButton>
        </form>
      </SimpleContainer.Content>
    </SimpleContainer>
  );
}
export default SecondaryLanguages;
