import React, { useRef, useEffect } from 'react';
import classes from './styles/PriviewMode.module.css';
import { Link } from 'react-router-dom';
import { MoreButton, MyListButton, PlayButton, ReactButton } from '../../UI/controllersbottons/ControllersButtons';
import { DetailsData } from '../title/components/PreviewModalData';
import { useSelector, useDispatch } from 'react-redux';
import { closePriviewModel } from '../../../store/features/priview-model/priviewModelSlice';
import { priviewAnimation } from '../../../helper/priviewAnimation';
import PriviewData from './PriviewData';

function PriviewMode() {
  const dispatch = useDispatch();
  const ref = useRef();
  let hoverElement = false;
  const priviewModelData = useSelector((store) => store.priviewModel);
  // console.log(priviewModelData);
  useEffect(() => {
    const cssStyle = {
      top: `${priviewModelData.position.top - ref.current.clientHeight / 2}px`,
      left: `${priviewModelData.position.left}px`,
    };

    ref.current.style.top = cssStyle.top;
    ref.current.style.left = cssStyle.left;
    const intervalTimer = priviewAnimation(ref, 0, 1);
    ref.current.addEventListener('mousemove', hoverElemnetHandler);

    const timer = setTimeout(() => {
      ref.current.addEventListener('mouseleave', closePriviewModelHandler);
      document.onmousemove = () => {
        if (!hoverElement) {
          return closePriviewModelHandler();
        }
      };
    }, 320);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalTimer);
    };
  }, []);

  const closePriviewModelHandler = () => {
    document.onmousemove = null;
    priviewAnimation(ref, 1, 0);
    setTimeout(() => {
      ref.current = null;
      dispatch(closePriviewModel());
    }, 300);
  };

  const hoverElemnetHandler = () => {
    let timer;
    hoverElement = true;
    if (hoverElement) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      hoverElement = false;
    }, 300);
  };

  return (
    <div className={classes.priviewMode}>
      <div className={classes.priviewMode_contener} ref={ref}>
        <div className={classes.image}>
          <div className={classes.image_padding}>
            <img src={priviewModelData.content.imageUrl} alt={priviewModelData.content.title} />
          </div>
        </div>
        <PriviewData id={priviewModelData.id} />
      </div>
    </div>
  );
}

export default PriviewMode;
