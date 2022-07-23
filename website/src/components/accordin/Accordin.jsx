import React from 'react';
import classes from './styles/accordin.module.css';

function Accordin({ children }) {
  return (
    <section className={classes.accordin}>
      <ul className={classes.inner}>{children}</ul>
    </section>
  );
}

Accordin.Title = ({ children }) => {
  return <h2 className={classes.title}>{children}</h2>;
};

Accordin.Item = function Item({ children, header, id, openFaqs, onOpen }) {
  const showBodyHandler = () => {
    onOpen((prev) => (prev === id ? null : id));
  };
  return (
    <li className={classes.item}>
      <div onClick={showBodyHandler} className={classes.header}>
        {header}
        {openFaqs === id ? (
          <img src="./images/icons/close-slim.png" alt="close" />
        ) : (
          <img src="./images/icons/add.png" alt="open" />
        )}
      </div>
      <div className={`${classes.body} ${openFaqs === id ? classes.showBody : classes.closeBody}`}>
        <div className={classes.bodyContent}>{children}</div>
      </div>
    </li>
  );
};

// Accordin.Header = ({ children }) => {
// };

// Accordin.Body = ({ children }) => {
//   return <div className={classes.body}>{children}</div>;
// };

export default Accordin;
