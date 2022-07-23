import React from 'react';
import MainView from '../components/browse/mainView/MainView';
import { useSelector } from 'react-redux/es/exports';

function BrowseContainer({ scroll }) {
  const scrollP = useSelector((store) => store.pagesState.scrollPosition);
  let style;
  if (!scroll) {
    style = { position: 'fixed', top: `-${scrollP}px` };
  } else {
    style = {};
  }
  return (
    <div style={style} className="main_browse">
      <MainView />
    </div>
  );
}

export default BrowseContainer;
