import React from 'react';
import { Link } from 'react-router-dom';
import classes from './styles/page404.module.css';

function Page404() {
  return (
    <div className={classes.page_notfound}>
      <div className={classes.page_container}>
        <h1 className={classes.title}>Lost Your Way?</h1>
        <p className={classes.message}>
          Sorry, we can't find that page. You'll find lots to explore on the home page.{' '}
        </p>
        <div className={classes.home_button}>
          <Link to={'/'}>
            <button>Netflix Home</button>
          </Link>
        </div>
        <div className={classes.error_code}>
          <span>
            Error Code <strong>NSES-404</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Page404;
