import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

import PlayerMatchStatsRow from './PlayerMatchStatsRow';

class MatchStatsTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.currentReplay || !this.props.currentReplay.replayId) {
      return (<div>Loading Replay Stats..</div>);
    }

    let statRows = this.props.currentReplay.stats.map((playerStats) => {
      return (<PlayerMatchStatsRow key={playerStats.playerId} playerStats={playerStats} />)
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

function mapStateToProps(state) {
  return {
    currentReplay: state.replays.currentReplay
  }
}

export default connect(mapStateToProps)(MatchStatsTable);
