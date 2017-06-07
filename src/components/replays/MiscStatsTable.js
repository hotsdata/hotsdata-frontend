import React from 'react';

import MiscStatsTableRow from './MiscStatsTableRow';

class MiscStatsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let replay = this.props.replay;
    if (replay == null || !replay.replayid) {
      return (<div>Loading Replay Stats..</div>);
    }

    let statRows = replay.player_stats.map((playerStats) => {
      let playerInfo = replay.account_info[playerStats.playerId];
      if (playerInfo == null) { console.log(playerStats.playerId, replay.account_info); }

      return (
        <MiscStatsTableRow
          key={playerStats.playerId}
          playerInfo={playerInfo}
          playerStats={playerStats} />
      )
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Hero</th>
            <th>Regen Globes</th>
            <th>Stun Time</th>
            <th>Silence Time</th>
            <th>CC Time</th>
            <th>Root Time</th>
            <th>Clutch Heals</th>
            <th>Time on Fire</th>
          </tr>
        </thead>
        <tbody>
          {statRows}
        </tbody>
      </table>
    )
  }

}

export default MiscStatsTable;
