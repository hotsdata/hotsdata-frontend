import React, { Component } from 'react';
import { Link } from 'react-router';

import SiteNotification from './SiteNotification';
import ProfileDropdown from './ProfileDropdown';

const Header = (props) => {
  return (
    <div className="site-header fixed">
      <SiteNotification
        message="Due to extremely high volume, replays are taking extra time to process.  Thanks for being patient while we catch up on the backlog."
      />
      <div className="nav-bar">
        <div className='nav-link'>
          <ProfileDropdown />
        </div>
        <div className='nav-link brand'>
          <Link to="/">About</Link>
        </div>
        <div className='nav-link'>
          <Link to={{pathname: "/replays", state: 'refresh'}}>Replays</Link>
        </div>
        <div className='nav-link'>
          <Link to="/upload">Upload</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
