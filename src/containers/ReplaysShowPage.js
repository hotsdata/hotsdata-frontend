import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import { fetchCurrentReplay } from '../actions/replay_actions';
import { secondsToTimeString } from '../lib/TimeUtils';
import MatchStatsTable from '../components/replays/MatchStatsTable';
import TeamFightingTable from '../components/replays/TeamFightingTable';
import TalentsTable from '../components/replays/TalentsTable';
import TeamStats from '../components/replays/TeamStats';
import MatchSiegeStats from '../components/replays/MatchSiegeStats';
import MatchPlayerPerformance from '../components/replays/MatchPlayerPerformance';
import MapStatsTable from '../components/replays/MapStatsTable';
import TeamMapStats from '../components/replays/maps/TeamMapStats';
import MiscStatsTable from '../components/replays/MiscStatsTable';
import CrossedSwords from '../../assets/crossed_swords.png';
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
    let team1 = replay.teams_stats[0];
    let team2 = replay.teams_stats[1];
    let team1Result = team1.isWinner ? "victory" : "defeat";
    let team2Result = team2.isWinner ? "victory" : "defeat";

    return (
      <div>
        <div className="replay-header">
          <div className="replay-team">
            <div className="team-info left">
              <h2 className="blue">Blue Team</h2>
              <h3>Level {team1.level}</h3>
              <h3 className={team1Result}>{_.capitalize(team1Result)}</h3>
            </div>
            <div className="kills">
              <span>{team1.totalEnemyHeroesTakenDown}</span>
              <img src={CrossedSwords} />
            </div>
          </div>
          <div className="replay-header-center">
            <h1>{replay.replay_data.mapName}</h1>
            <div className="summary-data">
              <span>{replay.replay_data.gameType}</span>
              <span>{secondsToTimeString(replay.replay_data.gameLoops/16)}</span>
            </div>
          </div>
          <div className="replay-team">
            <div className="kills">
              <img src={CrossedSwords} />
              <span>{team2.totalEnemyHeroesTakenDown}</span>
            </div>
            <div className="team-info right">
              <h2 className="red">Red Team</h2>
              <h3>Level {team2.level}</h3>
              <h3 className={team2Result}>{_.capitalize(team2Result)}</h3>
            </div>
          </div>
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
