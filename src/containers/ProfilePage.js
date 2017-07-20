import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table, Thead, Tbody, Th, Tr, Td} from 'reactable';
import _ from 'lodash';

import { fetchPlayerHeroStats } from '../actions/PlayerActions';
import { transformAllPlayerHerosData } from '../lib/PlayerHeroDataTransformer';
import { hotHeroes, coldHeroes } from '../lib/HeroStatsHelpers';
import HotColdTable from '../components/HotColdTable';
import './ProfilePage.scss';

function findStat(stat_array, stat) {
  return _.find(stat_array, (s) => s.metric == stat)
}

class ProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchPlayerHeroStats();
  }

  render() {
    if (!this.props.heroStats || this.props.isLoading) { return (<div>Loading...</div>); }
    let heroStats = transformAllPlayerHerosData(this.props.heroStats);
    let hotHeroesData = hotHeroes(heroStats.heroes);
    let coldHeroesData = coldHeroes(heroStats.heroes);

    return (
      <div className="profile-page">
        <h1>{heroStats.player}</h1>
        <div className="hot-cold-container">
          <HotColdTable title="Hot Heroes" data={hotHeroesData} />
          <HotColdTable title="Cold Heroes" data={coldHeroesData} />
        </div>
        <div>
          <h2>Goals Tracking</h2>
          <h4>Coming Soon!</h4>
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
