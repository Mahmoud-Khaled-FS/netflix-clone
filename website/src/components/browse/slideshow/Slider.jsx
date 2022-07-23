import React, { useEffect, useRef, useState } from 'react';
import classes from './styles/Slideshow.module.css';
import SliderItem from './SliderItem';

const Slider = ({ disableButtons, data, currentPage, elemntsOnScreen, state, changeSliderState }) => {
  const sRef = useRef();
  // console.log(elemntsOnScreen);
  //------------------------------------
  let fromIndex = elemntsOnScreen * currentPage;
  let toIndex = fromIndex + elemntsOnScreen * 3 + 2;
  let renderingElement = data.slice(fromIndex, toIndex);
  let indexDifference = toIndex - fromIndex - renderingElement.length;

  let transformBraker;
  if (currentPage > data.length / elemntsOnScreen) {
    transformBraker = currentPage - data.length / elemntsOnScreen;
  }
  if (indexDifference !== 0) {
    renderingElement = renderingElement.concat(data.slice(0, indexDifference));
  }
  const [items, setitems] = useState(renderingElement);
  //------------------------------------
  useEffect(() => {
    if (state === 'render') {
      setitems(renderingElement);
    } else {
      disableButtons(true);
      sRef.current.classList.add(classes.trans);
      if (state === 'next') {
        sRef.current.style.transform = `translate3d(-${
          !transformBraker ? 200 + 100 / elemntsOnScreen : 200 + 100 / elemntsOnScreen - transformBraker * 100
        }%,0,0)`;
      } else if (state === 'back') {
        sRef.current.style.transform = `translate3d(-${100 / elemntsOnScreen}%,0,0)`;
      } else if (state === 'firstmove') {
        sRef.current.style.transform = 'translate3d(-100%,0,0)';
      }

      const timer = setTimeout(() => {
        sRef.current.classList.remove(classes.trans);
        if (state === 'firstmove') {
          changeSliderState('next');
        }
        disableButtons(false);
        sRef.current.style.transform = `translate3d(-${100 + 100 / elemntsOnScreen}%,0,0)`;
        setitems(renderingElement);
      }, 750);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentPage]);
  // console.log(items.slice(7));
  //------------------------------------
  return (
    <div className={classes.slide_continer}>
      <div ref={sRef} className={`${classes.slide_continer_boxs}`}>
        {state === 'render' &&
          items.slice(elemntsOnScreen + 1, items.length).map((d) => <SliderItem key={d.id} item={d} />)}
        {state === 'firstmove' &&
          items.slice(elemntsOnScreen + 1, items.length).map((d) => <SliderItem key={d.id} item={d} />)}
        {state !== 'render' && state !== 'firstmove' && items.map((d) => <SliderItem key={d.id} item={d} />)}
      </div>
    </div>
  );
};

export default Slider;
