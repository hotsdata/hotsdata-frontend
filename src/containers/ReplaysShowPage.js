import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'semantic-ui-react';

import { fetchCurrentReplay } from '../actions/replay_actions';
import ReplayNav from './ReplayNav';
import MatchStatsTable from '../components/replays/MatchStatsTable';
import TalentsTable from '../components/replays/TalentsTable';

class ReplaysShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'stats'
    }

    this.changeTab = this.changeTab.bind(this);
  }

  componentWillMount() {
    let replayId = this.props.routeParams.replayId;
    this.props.fetchCurrentReplay(replayId)
  }

  changeTab(tabName) {
    this.setState({ currentTab: tabName });
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
        <ReplayNav onItemClick={this.changeTab} />
        <section className="stats-summary" style={{display: (this.state.currentTab === 'stats' ? 'inherit' : 'none')}}>
          <h3>Match Stats</h3>
          <MatchStatsTable />
        </section>
        <section className="talents-table" style={{display: (this.state.currentTab === 'talents' ? 'inherit' : 'none')}}>
          <h3>Talents</h3>
          <TalentsTable />
        </section>
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
