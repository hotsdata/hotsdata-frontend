import React, { Component } from 'react';
import { Link } from 'react-router';

// import Logo from '../../assets/logo-min.svg';
import Logo from './Logo';
import ProfileDropdown from './ProfileDropdown';

const Header = (props) => {
  return (
    <div className="site-header fixed">
      <div className="nav-bar">
        <div className='nav-link'>
          <Link className="brand" to="/">
            <Logo className="logo blue-shadow" />
          </Link>
        </div>
        <div className='nav-link'>
          <Link to="/replays">Replays</Link>
        </div>
        <div className="nav-link">
          <Link to="/players/compare">Compare</Link>
        </div>
        <div className='nav-link'>
          <Link to="/upload">Upload</Link>
        </div>
        <div className='nav-link'>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
}

export default Header;
