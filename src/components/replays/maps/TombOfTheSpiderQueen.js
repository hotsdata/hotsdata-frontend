import React from 'react';

class TombOfTheSpiderQueen extends React.Component {
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
        <td>{playerStats.GemsTurnedIn}</td>
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
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Hero</th>
              <th>Gems Turned In</th>
            </tr>
          </thead>
          <tbody>
            {statRows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TombOfTheSpiderQueen;
