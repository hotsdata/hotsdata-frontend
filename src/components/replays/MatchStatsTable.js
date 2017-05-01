import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

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
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Hero</Table.HeaderCell>
            <Table.HeaderCell>Level</Table.HeaderCell>
            <Table.HeaderCell>Takedowns</Table.HeaderCell>
            <Table.HeaderCell>Kills</Table.HeaderCell>
            <Table.HeaderCell>Assists</Table.HeaderCell>
            <Table.HeaderCell>Deaths</Table.HeaderCell>
            <Table.HeaderCell>Siege Damage</Table.HeaderCell>
            <Table.HeaderCell>Hero Damage</Table.HeaderCell>
            <Table.HeaderCell>XP</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {statRows}
        </Table.Body>
      </Table>
    )
  }
}

export default MatchStatsTable;
