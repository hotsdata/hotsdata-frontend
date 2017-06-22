import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { fetchCurrentReplay } from '../actions/replay_actions';
import MatchStatsTable from '../components/replays/MatchStatsTable';
import TeamFightingTable from '../components/replays/TeamFightingTable';
import TalentsTable from '../components/replays/TalentsTable';
import TeamStats from '../components/replays/TeamStats';
import MatchSiegeStats from '../components/replays/MatchSiegeStats';
import MatchPlayerPerformance from '../components/replays/MatchPlayerPerformance';
import MapStatsTable from '../components/replays/MapStatsTable';
import TeamMapStats from '../components/replays/maps/TeamMapStats';
import MiscStatsTable from '../components/replays/MiscStatsTable';
import './ReplayShowPage.scss';

class ReplaysShowPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let replayId = this.props.routeParams.replayId;
    this.props.fetchCurrentReplay(replayId)
  }

  render() {
    if (this.props.currentReplay == null || !this.props.currentReplay.replayid) {
      return (<div>Loading Replay..</div>);
    }

    let replay = this.props.currentReplay;
    console.log(replay);

    return (
      <div>
        <div className="replay-header">
          <h1>{this.props.currentReplay.replay_data.mapName}</h1>
        </div>
        <Tabs>
          <TabList>
            <Tab>Stats</Tab>
            <Tab>Talents</Tab>
            <Tab>Team Fighting</Tab>
            <Tab>Siege</Tab>
            <Tab>Team Stats</Tab>
            <Tab>Map Stats</Tab>
            <Tab>Misc Stats</Tab>
            <Tab>Performance</Tab>
          </TabList>
          <TabPanel className="stats-summary">
            <h3>Match Stats</h3>
            <MatchStatsTable replay={replay} />
          </TabPanel>
          <TabPanel className="talents-table">
            <h3>Talents</h3>
            <TalentsTable talents={replay.talents} />
          </TabPanel>
          <TabPanel className="team-fighting">
            <h3>Team Fighting</h3>
            <TeamFightingTable replay={replay} />
          </TabPanel>
          <TabPanel className="siege-stats">
            <h3>Siege Stats</h3>
            <MatchSiegeStats replay={replay} />
          </TabPanel>
          <TabPanel className="team-stats">
            <h3>Team Stats</h3>
            <TeamStats replay={replay} />
          </TabPanel>
          <TabPanel className="map-stats">
            <h3>Map Stats</h3>
            <div className="map-stats-wrapper">
              <TeamMapStats replay={replay} />
              <MapStatsTable replay={replay} />
            </div>
          </TabPanel>
          <TabPanel className="misc-stats">
            <h3>Misc. Stats</h3>
            <MiscStatsTable replay={replay} />
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
