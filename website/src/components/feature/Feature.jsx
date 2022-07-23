import React from 'react';
import classes from './styles/feature.module.css';
function Feature({ children }) {
  return <div className={classes.feature}>{children}</div>;
}
Feature.Title = ({ children }) => {
  return <h2 className={classes.title}>{children}</h2>;
};
Feature.SubTitle = ({ children }) => {
  return <h3 className={classes.subTitle}>{children}</h3>;
};
export default Feature;
