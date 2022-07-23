import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AngleRight from '../../../svg/Angle-Right';
import classes from './styles/Slideshow.module.css';
import data from './../../../fixtures/slidshow.json';
import Slider from './Slider';
import { paginationHandler } from './../../../helper/sliderElement';

function Slideshow(props) {
  const [currentPage, setCurrentPage] = useState(1);
  let [sliderState, setSliderState] = useState('render');
  let [disabled, setDisabled] = useState(false);
  let elemntsOnScreen = paginationHandler();
  const numberOfPages = data.length / elemntsOnScreen;
  const goNextHandler = () => {
    if (sliderState === 'render') {
      setSliderState('firstmove');
    } else {
      setSliderState('next');
    }
    if (currentPage >= numberOfPages) return setCurrentPage(1);
    return setCurrentPage((prev) => prev + 1);
  };
  const goBackHandler = () => {
    setSliderState('back');
    if (currentPage <= 1) return setCurrentPage(Math.round(numberOfPages));
    return setCurrentPage((prev) => prev - 1);
  };
  return (
    <div className={classes.slideshow}>
      <SlideHeader explore={true} title={props.name} id={props.id} />
      <div className={classes.slideshow_continer}>
        <div className={classes.slide}>
          <PaginationIndicator num={numberOfPages} activeClass={classes.active} current={currentPage} />
          {sliderState !== 'render' && (
            <span
              onClick={!disabled ? goBackHandler : null}
              className={`${classes.handle_slide} ${classes.handle_left}`}
            >
              <AngleRight />
            </span>
          )}
          <Slider
            changeSliderState={setSliderState}
            disableButtons={setDisabled}
            state={sliderState}
            elemntsOnScreen={elemntsOnScreen}
            currentPage={currentPage}
            data={props.data}
          />
          <span
            onClick={!disabled ? goNextHandler : null}
            className={`${classes.handle_slide} ${classes.handle_right}`}
          >
            <AngleRight />
          </span>
        </div>
      </div>
    </div>
  );
}
const SlideHeader = ({ explore, title, id }) => {
  return (
    <h2>
      <Link className={classes.link_slide} to={'/browse/m/genre/' + id}>
        <div className={classes.header_link}>{title}</div>
        {explore && (
          <div className={classes.explore_all}>
            <div className={classes.explore_text}>Explore All</div>
            <div className={classes.explore_icon}>
              <AngleRight />
            </div>
          </div>
        )}
      </Link>
    </h2>
  );
};

const PaginationIndicator = ({ num, activeClass, current }) => {
  let listItems = [];
  // aRef.current.className = '';

  for (let i = 0; i < num; i++) {
    i + 1 === current ? listItems.push(<li className={activeClass} key={i}></li>) : listItems.push(<li key={i}></li>);
  }
  return <ul className={classes.pagination_indicator}>{listItems}</ul>;
};

export default Slideshow;
