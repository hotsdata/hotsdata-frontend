import React from 'react';
import { Link } from 'react-router';

const Footer = (props) => {
  return (
    <div className="site-footer">
      <div className='nav-link'>
        <Link to="/about">About</Link>
      </div>
      <div className='nav-link'>
        <Link to="/changelog">Changelog</Link>
      </div>
      <div className='nav-link'>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  )
}

export default Footer;
