import React from 'react';
import classes from './styles/backdrop.module.css';
function Backdrop(props) {
  return <div {...props} className={classes.backdrop}></div>;
}

export default Backdrop;
