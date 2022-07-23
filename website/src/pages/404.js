import React from 'react';
import Page404 from '../components/PagesNotFound/Page404';
import HeaderContainer from '../containers/Header';

function NotFound() {
  document.body.className = 'lightDark';
  return (
    <>
      {/* <div style={{}}></div> */}
      <HeaderContainer size={'small'} style={{ backgroundColor: '#000', zIndex: 9999, position: 'relative' }} />
      <Page404 />
    </>
  );
}

export default NotFound;
