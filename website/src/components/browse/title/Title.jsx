import React from 'react';
import classes from './styles/title.module.css';
import PlayButton from '../../UI/playbutton/PlayButton';
import { ReactButton, MyListButton } from '../../UI/controllersbottons/ControllersButtons';
import { useEffect } from 'react';
import { useRef } from 'react';
function Title({ children }) {
  const maxWidth = 850;
  const ref = useRef();
  useEffect(() => {
    // console.log(ref);

    if (window.innerWidth < maxWidth) {
      ref.current.style.width = window.innerWidth - 100 + 'px';
      ref.current.style.minWidth = '';
    } else {
      ref.current.style.width = 893 + 'px';
      ref.current.style.minWidth = '850px';
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < maxWidth) {
        ref.current.style.width = window.innerWidth - 100 + 'px';
        ref.current.style.minWidth = '';
      } else {
        ref.current.style.width = 893 + 'px';
        ref.current.style.minWidth = '850px';
      }
    });
  }, []);
  return (
    <div>
      <div id="title" className={classes.page_title}>
        <div ref={ref} style={{ minWidth: 850 }} className={`${classes.title} on_open_animation`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export const TitleHeader = ({ data }) => {
  return (
    <div className={classes.title_header}>
      <div className={classes.title_header_image}>
        <img src={data.imageCoverUrl} alt={data.title} />
      </div>
      <div className={classes.title_header_container}>
        <div className={classes.title_header_content}>
          <div className={classes.title_header_info}>
            {/* <img src={data.imageTitleUrl} alt={data.title} /> */}
            <div className={classes.title_header_controls}>
              <PlayButton className={classes.play} link="/browse" />
              <MyListButton />
              <ReactButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
