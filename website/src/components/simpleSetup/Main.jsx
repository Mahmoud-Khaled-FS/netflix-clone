import React from 'react';
import classes from './styles/simple-setup.module.css';

function SimpleContainer({ children }) {
  return (
    <div className={classes.simpleContainer}>
      <div className={classes.simpleContent}>{children}</div>
    </div>
  );
}
SimpleContainer.AsideContainer = ({ title, subTitle, boldSubTitle, currentStep, totalSteps }) => {
  return (
    <SimpleContainer.Aside>
      <SimpleContainer.Header>
        <SimpleContainer.StepsNumber currentStep={currentStep} totalSteps={totalSteps} />
        <SimpleContainer.Title>{title}</SimpleContainer.Title>
        <SimpleContainer.SubTitle>
          {subTitle}
          {boldSubTitle ? <strong> {boldSubTitle}</strong> : null}
        </SimpleContainer.SubTitle>
      </SimpleContainer.Header>
    </SimpleContainer.Aside>
  );
};
SimpleContainer.Aside = ({ children }) => {
  return <div className={classes.asideContainer}>{children}</div>;
};
SimpleContainer.Header = ({ children }) => {
  return <div className={classes.header}>{children}</div>;
};
SimpleContainer.StepsNumber = ({ currentStep, totalSteps }) => {
  return (
    <div className={classes.header}>
      <span className={classes.stepNumber}>
        STEP <b>{currentStep}</b> OF <b>{totalSteps}</b>
      </span>
    </div>
  );
};
SimpleContainer.Title = ({ children }) => {
  return <h1 className={classes.mainTitle}>{children}</h1>;
};
SimpleContainer.SubTitle = ({ children }) => {
  return <div className={classes.mainSubTitle}>{children}</div>;
};
SimpleContainer.Content = ({ children }) => {
  return <div className={classes.mainSetup}>{children}</div>;
};
SimpleContainer.Button = ({ children, ...props }) => {
  return (
    <div className={classes.submitContainer}>
      <button type="submit" className={classes.submit}>
        {children}
      </button>
    </div>
  );
};
SimpleContainer.FixedButton = ({ children }) => {
  return (
    <div className={classes.fixedButton}>
      <div className={classes.fixedButtonContainer}>
        <button type="submit" className={classes.submit}>
          {children}
        </button>
      </div>
    </div>
  );
};
export default SimpleContainer;
