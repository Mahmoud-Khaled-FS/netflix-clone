import React from 'react';
import XmarkSvg from '../../../svg/Xmark';
import { useNavigate } from 'react-router-dom';
import classes from './styles/closebutton.module.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { genreState, setScroll } from '../../../store/features/pagesState/pagesStatesSlice';

function CloseButton() {
  const navigate = useNavigate();
  const scrollP = useSelector((store) => store.pagesState.scrollPosition);
  const dispatch = useDispatch();
  const closeGenreHandler = () => {
    window.scrollTo({ top: scrollP });
    dispatch(genreState(false));
    dispatch(setScroll(0));
    navigate('/browse');
  };
  return (
    <button onClick={closeGenreHandler} className={classes.close_button}>
      <div>
        <XmarkSvg />
      </div>
    </button>
  );
}
export default CloseButton;
