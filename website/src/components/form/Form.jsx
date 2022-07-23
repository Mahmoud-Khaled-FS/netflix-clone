import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './styles/form.module.css';

function Form({ children }) {
  return <div className={classes.form}>{children}</div>;
}

Form.FormContainer = ({ children, ...props }) => {
  return (
    <form className={classes.formContiner} {...props}>
      {children}
    </form>
  );
};

Form.Error = ({ children }) => {
  return <div className={classes.error}>{children}</div>;
};

Form.Title = ({ children }) => {
  return <div className={classes.title}>{children}</div>;
};

Form.TextBox = ({ children }) => {
  return <div className={classes.textBox}>{children}</div>;
};

Form.Text = ({ children }) => {
  return <p className={classes.text}>{children}</p>;
};

Form.SmallText = ({ children }) => {
  return <p className={classes.smallText}>{children}</p>;
};

Form.Link = ({ children, to, ...props }) => {
  return (
    <Link {...props} to={to} className={classes.link}>
      {children}
    </Link>
  );
};

Form.Input = function Input({ type, id, label, error, value, ...props }) {
  const inputRef = useRef(null);
  const showPassword = (e) => {
    if (e.target.dataset.input === 'hidden') {
      inputRef.current.type = 'text';
      e.target.textContent = 'hide';
      e.target.dataset.input = 'visible';
    } else if (e.target.dataset.input === 'visible') {
      inputRef.current.type = 'password';
      e.target.textContent = 'show';
      e.target.dataset.input = 'hidden';
    }
  };
  const className = `${classes.input} ${props.className && props.className} ${
    type === 'password' && classes.inputPassword
  } ${error && classes.errorInput} ${value && classes.hasText}`;
  return (
    <div className={classes.inputContainer}>
      <div className={className}>
        <input value={value} {...props} id={id} type={type} ref={inputRef} />
        <label htmlFor={id}>{label}</label>
        {type === 'password' && (
          <button className={classes.passwordShow} type="button" data-input="hidden" onClick={showPassword}>
            Show
          </button>
        )}
      </div>
      {error && <p className={classes.errorMassege}>{error}</p>}
    </div>
  );
};

Form.Submit = ({ children }) => {
  return <button className={classes.submit}>{children}</button>;
};

export default Form;
