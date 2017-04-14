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
    let statRows = this.props.currentReplay.general_stats.map((playerStats) => {
      return (<PlayerMatchStatsRow playerStats={playerStats} />)
    });

    return (
      <div>
        <div className="replay-header">
          Header Goes Here
        </div>
        <div className="stats-summary">
          <h2>Match Stats</h2>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Hero</Table.HeaderCell>
                <Table.HeaderCell>Kills</Table.HeaderCell>
                <Table.HeaderCell>Deaths</Table.HeaderCell>
                <Table.HeaderCell>Siege Damage</Table.HeaderCell>
                <Table.HeaderCell>Hero Damage</Table.HeaderCell>
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
