import React from 'react';

class TowersOfDoom extends React.Component {
  constructor(props) {
    super(props)

    this.createStatsRow = this.createStatsRow.bind(this);
  }

  createStatsRow(playerInfo, playerStats) {
    let isWinner = playerInfo.gameResult == 1;

    return (
      <tr key={playerStats.playerId} className={(isWinner ? 'victory-row' : 'defeat-row')}>
        <td>{playerInfo.name}</td>
        <td>{playerStats.heroName}</td>
        <td>{playerStats.AltarDamageDone}</td>
      </tr>
    )
  }

  render() {
    let replay = this.props.replay;
    let statRows = replay.player_stats.map((playerStats) => {
      let playerInfo = replay.account_info[playerStats.playerId];
      return this.createStatsRow(playerInfo, playerStats);
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Hero</th>
            <th>Shots fired to altar</th>
          </tr>
        </thead>
        <tbody>
          {statRows}
        </tbody>
      </table>
    )
  }
}

export default TowersOfDoom;
