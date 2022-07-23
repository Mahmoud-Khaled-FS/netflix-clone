import React from 'react';
import classes from './styles/Jumbotron.module.css';
function Jumbotron({ children, direction }) {
  const classNameInner = `${classes.inner} ${classes[direction]}`;
  // console.log(className);
  return (
    <div className={classes.jumbotronItem}>
      <div className={classNameInner}>{children}</div>
    </div>
  );
}

Jumbotron.Container = ({ children }) => {
  return <div className={classes.jumbotronContainer}>{children}</div>;
};

Jumbotron.Pane = ({ children }) => {
  return <div className={classes.jumbotronPane}>{children}</div>;
};

Jumbotron.Title = ({ children }) => {
  return <h1 className={classes.jumbotronTitle}>{children}</h1>;
};

Jumbotron.SubTitle = ({ children }) => {
  return <h2 className={classes.jumbotronSubTitle}>{children}</h2>;
};

Jumbotron.Image = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

export default Jumbotron;
