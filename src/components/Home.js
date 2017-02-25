import React from 'react';
import Header from './Header';

const Home = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Home;
