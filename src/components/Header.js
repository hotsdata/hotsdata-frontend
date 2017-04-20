import React, { Component } from 'react';
import { Link } from 'react-router';

const Header = (props) => {
  return (
    <div className="site-header fixed">
      <div className='nav-link brand'>
        <Link to="/">HotsData</Link>
      </div>
      <div className='nav-link'>
        <Link to="/replays">Replays</Link>
      </div>
      <div className='nav-link'>
        <Link to="/upload">Upload</Link>
      </div>
      <div className='nav-link'>
        <Link to="/signin">Log In</Link>
      </div>
      <div className='nav-link'>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Header;
