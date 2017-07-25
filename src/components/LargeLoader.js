import React from 'react';

import Spinner from 'react-spinkit';

const LargeLoader = (props) => {
  return (
    <div className="large-loader">
      <Spinner name="ball-spin-fade-loader" color="orange" />
    </div>
  )
}

export default LargeLoader;
