import React from 'react';
import AngleRight from '../../../svg/Angle-Right';
import { DislikeSvg, LikeSvg, LoveSvg, PlusSvg } from '../../../svg/contolles';
import PlaySvg from '../../../svg/Play';
import classes from './styles/mylistbutton.module.css';

export function MyListButton({ className }) {
  return (
    <div className={`${classes.button} ${className ? className : ''}`}>
      <button className={classes.borderButton}>
        <div className={classes.svg}>
          <PlusSvg />
        </div>
      </button>
    </div>
  );
}
export function MoreButton({ onClick, className }) {
  return (
    <div className={`${classes.button} ${className ? className : ''}`}>
      <button onClick={onClick} className={classes.borderButton}>
        <div className={classes.svg}>
          <AngleRight />
        </div>
      </button>
    </div>
  );
}
export function PlayButton({ className }) {
  return (
    <div className={`${classes.button} ${className ? className : ''}`}>
      <button className={`${classes.play} ${classes.borderButton}`}>
        <div className={classes.svg}>
          <PlaySvg />
        </div>
      </button>
    </div>
  );
}
export function ReactButton({ className }) {
  return (
    <div className={`${classes.button} ${className ? className : ''}`}>
      <button className={classes.borderButton}>
        <div className={classes.svg}>
          <LikeSvg />
        </div>
      </button>
      <div className={classes.react}>
        <div>
          <div className={classes.react_buttons}>
            <div className={classes.svg_react}>
              <button>
                <DislikeSvg className={classes.scalle} />
              </button>
            </div>
            <div className={classes.svg_react}>
              <button>
                <LikeSvg />
              </button>
            </div>
            <div className={classes.svg_react}>
              <button>
                <LoveSvg className={classes.scalle} />
              </button>
            </div>
          </div>
        </div>
        <div className={classes.showButton}></div>
      </div>
    </div>
  );
}
