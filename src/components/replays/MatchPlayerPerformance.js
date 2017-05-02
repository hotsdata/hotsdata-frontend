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
        <div>
          Player list here
        </div>
        <div>
          <div className="match-performance-header">
            Marod - Kerrigan
          </div>
        </div>
      </div>
    );
  }

}

export default MatchPlayerPerformance;
