import React, { useRef } from 'react';
import classes from './styles/genre.module.css';
import classesSlider from '../slideshow/styles/Slideshow.module.css';
import { Link } from 'react-router-dom';
import AngleRight from '../../../svg/Angle-Right';

function Genre({ children }) {
  const ref = useRef();
  return (
    <div>
      <div ref={ref} className={classes.page_genre}>
        <div className={classes.genre}>
          <div className={`${classes.genre_container} on_open_animation`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
Genre.Container = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};
Genre.Title = ({ children }) => {
  return <div className={classes.title}>{children}</div>;
};
Genre.BoxContainer = ({ children }) => {
  return <div className={classes.box_container}>{children}</div>;
};
Genre.Box = ({ children }) => {
  return <div className={classes.box_items}>{children}</div>;
};
Genre.BoxTitle = ({ children }) => {
  return (
    <h2 className={classes.header_title}>
      <Link className={classesSlider.link_slide} to="/browse">
        <div className={classesSlider.header_link}>{children}</div>
        <div className={classesSlider.explore_all}>
          <div className={classesSlider.explore_text}>Explore All</div>
          <div className={`${classes.explore_icon} ${classesSlider.explore_icon}`}>
            <AngleRight />
          </div>
        </div>
      </Link>
    </h2>
  );
};
Genre.ItemContainer = ({ children }) => {
  return (
    <div className={classes.item_container}>
      <div className={classes.items}>{children}</div>
      <div className={classes.divider}></div>
    </div>
  );
};
Genre.Item = ({ item }) => {
  // console.log(item);
  return (
    <div className={classes.card_box}>
      <div className={classes.title_card}>
        <Link to={'/browse/title/' + item.id}>
          <div className={classes.card_box_preview}>
            <img src={item.imageUrl} alt={item.title} />
            <div className={classes.under_image}></div>
          </div>
        </Link>
      </div>
    </div>
  );
};
Genre.MoreContainerButton = function CloseButton({ onClick, className }) {
  return (
    <div className={`${classes.more_container} ${className ? className : ''}`}>
      <button onClick={onClick}>
        <AngleRight />
      </button>
    </div>
  );
};
export default Genre;
