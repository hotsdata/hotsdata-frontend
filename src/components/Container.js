import React from 'react';
import Header from './Header';

const Home = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container content">
        <div className="errors">
          An error has occured
        </div>
        {children}
      </div>
    </div>
  );
};

export default Home;
