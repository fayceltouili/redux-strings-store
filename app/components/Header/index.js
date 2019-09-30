import React from 'react';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

function Header() {
  return (
    <div>
      <NavBar>
        <HeaderLink to="/"> HOME </HeaderLink>
        <HeaderLink to="/add"> ADD NEW STRING </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
