import React from 'react';
import Header from '../components/header/Header';
import logo from '../logo.svg';
function HeaderContainer({ children, size, login = false, background, style, loginStyle, headerStyle }) {
  return (
    <Header style={style} background={background && background}>
      <Header.Frame style={headerStyle} size={size}>
        <Header.Logo size={size} to="/" src={logo} alt="Netflix" />
        {login && (
          <Header.ButtonLink style={loginStyle} to={'/login'}>
            Sign In
          </Header.ButtonLink>
        )}
      </Header.Frame>
      {children}
    </Header>
  );
}

export default HeaderContainer;
