import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { fetchCurrentReplay } from '../actions/replay_actions';
import MatchStatsTable from '../components/replays/MatchStatsTable';
import TalentsTable from '../components/replays/TalentsTable';
import MatchPlayerPerformance from '../components/replays/MatchPlayerPerformance';

class ReplaysShowPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let replayId = this.props.routeParams.replayId;
    this.props.fetchCurrentReplay(replayId)
  }

  render() {
    if (!this.props.currentReplay || !this.props.currentReplay.replayId) {
      return (<div>Loading Replay..</div>);
    }

    return (
      <div>
        <div className="replay-header">
          <h1>{this.props.currentReplay.mapName}</h1>
        </div>
        <Tabs>
          <TabList>
            <Tab>Stats</Tab>
            <Tab>Talents</Tab>
            <Tab>Performance</Tab>
          </TabList>
          <TabPanel className="stats-summary">
            <h3>Match Stats</h3>
            <MatchStatsTable />
          </TabPanel>
          <TabPanel className="talents-table">
            <h3>Talents</h3>
            <TalentsTable />
          </TabPanel>
          <TabPanel className="player-performance">
            <h3>Player Performance</h3>
            <MatchPlayerPerformance />
          </TabPanel>
        </Tabs>
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
