import React, { Component } from 'react';
import { connect } from 'react-redux';

import SiegeStatsRow from './SiegeStatsRow';

class MatchSiegeStats extends Component {
  constructor(props) {
    super(props)
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
        <SiegeStatsRow
          key={playerStats.playerId}
          playerInfo={playerInfo}
          playerStats={playerStats} />
      )
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Player></th>
            <th>Hero</th>
            <th>Creep Damage</th>
            <th>Minion Damage</th>
            <th>Forts Destroyed</th>
            <th>Structure Damage</th>
            <th>Minions Killed</th>
            <th>Buildings Killed</th>
          </tr>
        </thead>
        <tbody>
          {statRows}
        </tbody>
      </table>
    )
  }
}

export default MatchSiegeStats;
