import React from 'react';
import { Link } from 'react-router-dom';
import PlaySvg from '../../../svg/Play';
import classes from './styles/play.module.css';
function PlayButton({ link, className }) {
  return (
    <Link className={`${classes.play} ${className}`} to={link}>
      <button>
        <PlaySvg />
        <span>Play</span>
      </button>
    </Link>
  );
}

export default PlayButton;
