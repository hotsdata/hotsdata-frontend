import React, { Component } from 'react';

class MatchPlayerPerformance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '0'
    }

    this.handlePlayerClick = this.handlePlayerClick.bind(this);
  }

  handlePlayerClick(e, {name}) {
    this.setState({activeItem: name});
  }

  render() {
    return (
      <div>
        <div className="player-list">
        </div>
        <div>
          <div className="match-performance-header">
            <h3>Coming Soon!</h3>
            <p>
              Here we intend to show each of a players stats compared to the rest of the community.  
            </p>
          </div>
        </div>
      </div>
    );
  }

}

export default MatchPlayerPerformance;
