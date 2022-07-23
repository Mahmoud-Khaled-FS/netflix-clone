import React, { useRef } from 'react';
import classes from './styles/Slideshow.module.css';
import { Link } from 'react-router-dom';
import { showPriviewModel } from '../../../store/features/priview-model/priviewModelSlice';
import { useDispatch } from 'react-redux';

function SliderItem({ item }) {
  const dispatch = useDispatch();
  const ref = useRef();
  let timer;

  const showPriviewModelHandler = (e) => {
    if (e.clientX > window.innerWidth - 70 || e.clientX < 70) return;
    const { x, y, height, width } = ref.current.getBoundingClientRect();
    const topPosition = y + height / 2 + window.scrollY;
    const skipPadding = document.body.clientWidth * 0.04;
    let leftPosition = x;
    if (Math.round(skipPadding) === Math.round(x)) {
      leftPosition = x + skipPadding - 1;
    } else if (Math.round(x + width + skipPadding) === Math.round(document.body.clientWidth)) {
      leftPosition = x - skipPadding;
    }

    timer = setTimeout(() => {
      dispatch(
        showPriviewModel({
          id: item.id,
          content: { imageUrl: item.imageUrl, title: item.title },
          position: { left: leftPosition, top: topPosition },
        })
      );
    }, 350);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={showPriviewModelHandler}
      onMouseLeave={() => clearTimeout(timer)}
      className={classes.slide_box}
    >
      <div className={classes.title_card}>
        <Link to={'/browse/title' + item.id}>
          <div className={classes.slide_box_preview}>
            <img src={item.imageUrl} alt={item.title} />
            <div className={classes.under_image}></div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SliderItem;
