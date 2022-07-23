import React from 'react';
import classes from './styles/gsForm.module.css';

function GsForm({ children }) {
  return <div className={classes.gsForm}>{children}</div>;
}

GsForm.Title = ({ children }) => {
  return <h3 className={classes.title}>{children}</h3>;
};

GsForm.Form = ({ children, ...props }) => {
  return (
    <form {...props} className={classes.form}>
      {children}
    </form>
  );
};

GsForm.Input = ({ type, label, id, value, error, ...props }) => {
  return (
    <div className={classes.input}>
      <input
        {...props}
        value={value}
        id={id}
        className={`${classes.input} ${error ? classes.error : null} ${value ? classes.hasText : null}`}
        type={type}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

GsForm.Button = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.button}>
      {children}
      <img src="./images/icons/chevron-right.png" alt="chevron right" />
    </button>
  );
};

GsForm.Error = ({ children, ...props }) => {
  return <p className={classes.errorMessage}>{children}</p>;
};
GsForm.Break = () => {
  return <div className={classes.break}></div>;
};

export default GsForm;
