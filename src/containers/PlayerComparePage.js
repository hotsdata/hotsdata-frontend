import React from 'react';

import StandardFilter from '../components/filters/StandardFilter';
import './PlayerComparePage.scss';

const imgUrl = "http://media.blizzard.com/heroes/malthael/bust.jpg";

class PlayerComparePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player-compare-page">
        <div className="top">
          <div className="hero">
            <h2>Malthael</h2>
            <img src={imgUrl} />
          </div>
          <div className="controls">
            <StandardFilter />
          </div>
        </div>
        <div className="tabs">
          Tabs
        </div>
        <div>
          Table
        </div>
      </div>
    )
  }

}

export default PlayerComparePage;
