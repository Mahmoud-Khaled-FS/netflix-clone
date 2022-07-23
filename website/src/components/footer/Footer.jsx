import React from 'react';
import classes from './styles/footer.module.css';
function Footer({ children, mini, align, style }) {
  return (
    <footer style={style} className={`${classes.footer} ${mini && classes.mini}`}>
      <div className={`${classes.container} ${align === 'left' && classes.left}`}>{children}</div>
    </footer>
  );
}
Footer.Row = ({ children }) => {
  return <div className={classes.row}>{children}</div>;
};

Footer.Column = ({ children }) => {
  return <div className={classes.column}>{children}</div>;
};

Footer.Link = ({ children }) => {
  return (
    <a href="/" className={classes.link}>
      {children}
    </a>
  );
};

Footer.Title = ({ children }) => {
  return <p className={classes.title}>{children}</p>;
};

Footer.Text = ({ children }) => {
  return <p className={classes.text}>{children}</p>;
};

Footer.Break = () => {
  return <div className={classes.break}></div>;
};

export default Footer;
