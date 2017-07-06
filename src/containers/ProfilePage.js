import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table, Thead, Tbody, Th, Tr, Td} from 'reactable';
import _ from 'lodash';

import { fetchPlayerHeroStats } from '../actions/PlayerActions';
import HotColdTable from '../components/HotColdTable';
import './ProfilePage.scss';

function findStat(stat_array, stat) {
  return _.find(stat_array, (s) => s.metric == stat)
}

const testDataHot = [
  { hero: "Tyrande", winRate: 70.3, games: 37 },
  { hero: "Tassadar", winRate: 66.7, games: 36 },
  { hero: "Genji", winRate: 60.0, games: 20 },
  { hero: "Malthael", winRate: 61.1, games: 18 },
  { hero: "Li-Ming", winRate: 60.0, games: 10 }
]

const testDataCold = [
  { hero: "Zul'jin", winRate: 40.0, games: 20 },
  { hero: "Cassia", winRate: 41.2, games: 17 },
  { hero: "Falstad", winRate: 35.7, games: 14 },
  { hero: "Dehaka", winRate: 30.0, games: 10 },
  { hero: "Anub'arak", winRate: 25.0, games: 8 }
]

class ProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchPlayerHeroStats();
  }

  render() {

    return (
      <div className="profile-page">
        <h1>Placeholder Design For Profile Page</h1>
        <div className="hot-cold-container">
          <HotColdTable title="Hot Heroes" data={testDataHot} />
          <HotColdTable title="Cold Heroes" data={testDataCold} />
        </div>
        <div>
          <h2>Goals Tracking</h2>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    heroStats: state.player.heroStats,
    error: state.player.error,
    isLoading: state.player.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlayerHeroStats: fetchPlayerHeroStats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
