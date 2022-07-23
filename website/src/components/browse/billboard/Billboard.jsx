import React from 'react';
import classes from './styles/billboard.module.css';
import billboard from './../../../fixtures/billboard.json';
import Top10 from '../../../svg/Top10';
import { Link } from 'react-router-dom';
import PlaySvg from '../../../svg/Play';
import HawkinsSvg from '../../../svg/Hawkins';
import PlayButton from '../../UI/playbutton/PlayButton';
function Billboard() {
  return (
    <div className={classes.billboard}>
      <div className={classes.billboard_container}>
        <div className={classes.billboard_main}>
          <BackGroundMask />
          <MainContentBillboard />
        </div>
      </div>
    </div>
  );
}
const BackGroundMask = () => {
  return (
    <div className={classes.billboard_mask}>
      <div className={classes.imageBackground}>
        <img src={billboard.backgroundImageUrl} alt={billboard.title} />
        <div className={classes.background_bropLeft}></div>
        <div className={classes.background_bropBottom}></div>
      </div>
    </div>
  );
};
const MainContentBillboard = () => {
  return (
    <div className={classes.content_container}>
      <div className={classes.content_info}>
        <div className={classes.content}>
          <div className={classes.logo_title}>
            <div className={classes.image_logo}>
              <img src={billboard.titleImageUrl} alt={billboard.title} />
            </div>
          </div>
        </div>
        <div className={classes.info}>
          <h1 className={classes.title}>
            <Top10 />
            #1 in TV Shows Today
          </h1>
          <div className={classes.synopsis}>
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying
            supernatural forces and one strange little girl.
          </div>
        </div>
        <div className={classes.buttons}>
          <PlayButton className={classes.play} link="/browse" />
          <button className={classes.more_info}>
            <HawkinsSvg />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
