import React, { Component } from 'react';
import { Link } from 'react-router';

import ProfileDropdown from './ProfileDropdown';

const Header = (props) => {
  return (
    <div className="site-header fixed">
      <div className='nav-link'>
        <ProfileDropdown />
      </div>
      <div className='nav-link brand'>
        <Link to="/">About</Link>
      </div>
      <div className='nav-link'>
        <Link to="/replays">Replays</Link>
      </div>
      <div className='nav-link'>
        <Link to="/upload">Upload</Link>
      </div>
    </div>
  );
}

export default Header;
