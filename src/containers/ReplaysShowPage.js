import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'semantic-ui-react';

import { fetchCurrentReplay } from '../actions/replay_actions';
import PlayerMatchStatsRow from '../components/replays/PlayerMatchStatsRow';

class ReplaysShowPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let replayId = this.props.routeParams.replayId;
    this.props.fetchCurrentReplay(replayId)
  }

  render() {
    // console.log('transformed stats', this.props.currentReplay);
    if (!this.props.currentReplay || !this.props.currentReplay.replayId) {
      return (<div>Loading..</div>);
    }

    // console.log('transformed stats', this.props.currentReplay);

    let statRows = this.props.currentReplay.stats.map((playerStats) => {
      return (<PlayerMatchStatsRow playerStats={playerStats} />)
    });

    return (
      <div>
        <div className="replay-header">
          {this.props.currentReplay.mapName}
        </div>
        <div className="stats-summary">
          <h2>Match Stats</h2>
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
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentReplay: state.replays.currentReplay
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentReplay }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplaysShowPage);
