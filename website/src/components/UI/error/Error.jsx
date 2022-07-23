import React from 'react';
import Backdrop from '../backdrop/Backdrop';
import classes from './error.module.css';
const Error = (props) => {
  return (
    <>
      <div className={classes.error_box}>
        <div className={classes.error}>
          <p>{props.message}</p>
          <p>Error: {props.code}</p>
          <a href="/">Try Again</a>
        </div>
      </div>
      <Backdrop />
    </>
  );
};

export default Error;
