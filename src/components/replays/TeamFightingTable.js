import React, { Component } from 'react';

import TeamFightingStatsRow from './TeamFightingStatsRow';

class TeamFightingTable extends Component {
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
        <TeamFightingStatsRow
          key={playerStats.playerId}
          playerInfo={playerInfo}
          playerStats={playerStats} />
      )
    });

    return (
      <table className="table match-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Hero</th>
            <th>Solo Deaths</th>
            <th>Outnumbered Deaths</th>
            <th>Hero Damage</th>
            <th alt="Teamfighting Hero Damage">TF Hero Damage</th>
            <th>Damage Taken</th>
            <th>TF Damage Taken</th>
            <th>Net TF Damage</th>
            <th>Healing Done</th>
            <th>TF Healing Done</th>
          </tr>
        </thead>
        <tbody>
          {statRows}
        </tbody>
      </table>
    )
  }
}

export default TeamFightingTable;
