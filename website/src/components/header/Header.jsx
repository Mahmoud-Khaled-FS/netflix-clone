import React from 'react';
import classes from './styles/header.module.css';
import { Link } from 'react-router-dom';

function Header({ background, children, style, ref, ...props }) {
  if (background) {
    return (
      <div
        className={`${classes.header} ${classes.hasImage}`}
        style={{ ...{ backgroundImage: `url(${background})` }, ...style }}
      >
        <div className={classes.backdrop}></div>
        <div>{children}</div>
      </div>
    );
  }
  return (
    <div ref={ref} {...props} style={style}>
      {children}
    </div>
  );
}

Header.Frame = ({ children, size, ...props }) => {
  const className = `${classes.container} ${props.className ? props.className : null} ${
    size === 'small' ? classes.smallContainer : classes.largeContainer
  }`;
  return (
    <header {...props} className={className}>
      {children}
    </header>
  );
};

Header.Logo = ({ size = 'small', src, alt, to, ...props }) => {
  const className = `${classes.logo} ${size === 'small' ? classes.smallLogo : classes.largeLogo}`;
  return (
    <Link {...props} to={to}>
      <img className={className} src={src} alt={alt} />
    </Link>
  );
};

Header.ButtonLink = ({ children, to, style }) => {
  return (
    <Link className={style === 'link' ? classes.link : classes.buttonLink} to={to}>
      {children}
    </Link>
  );
};
export default Header;
