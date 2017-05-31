import React, { Component } from 'react';

class TeamTowersOfDoom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ts = this.props.replay.teams_stats;
    console.log(ts);

    return (
      <div>
        Coming Soon!
      </div>
    )
  }
}

export default TeamTowersOfDoom;
