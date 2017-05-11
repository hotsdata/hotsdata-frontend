import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayerMatchStatsRow from './PlayerMatchStatsRow';

class MatchStatsTable extends Component {
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
      return (
        <PlayerMatchStatsRow
          key={playerStats.playerId}
          playerInfo={playerInfo}
          playerStats={playerStats} />
      )
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Award</th>
            <th>Player</th>
            <th>Hero</th>
            <th>Level</th>
            <th>Takedowns</th>
            <th>Kills</th>
            <th>Assists</th>
            <th>Deaths</th>
            <th>Hero Damage</th>
            <th>Siege Damage</th>
            <th>XP</th>
            <th>Highest Kill Streak</th>
          </tr>
        </thead>
        <tbody>
          {statRows}
        </tbody>
      </table>
    )
  }
}

export default MatchStatsTable;
