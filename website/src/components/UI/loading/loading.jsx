import React from 'react';
import classes from './styles/loading.module.css';
import img from '../../../images/spinner.png';
const Loading = (props) => {
  return (
    <div {...props} className={classes.loading}>
      <img src={img} alt="loading" />
    </div>
  );
};

export default Loading;
