import React from 'react';

class Hanamura extends React.Component {
  constructor(props) {
    super(props)

    this.createStatsRow = this.createStatsRow.bind(this);
  }

  createStatsRow(playerInfo, playerStats) {
    let isWinner = playerInfo.gameResult == 1;

    return (
      <div></div>
    )
  }

  render() {
    let replay = this.props.replay;
    let statRows = replay.player_stats.map((playerStats) => {
      let playerInfo = replay.account_info[playerStats.playerId];
      return this.createStatsRow(playerInfo, playerStats);
    });

    return (
      <div>No Map specific stats yet :(</div>
    )
  }
}

export default Hanamura;
