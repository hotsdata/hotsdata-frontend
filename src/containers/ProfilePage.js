import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Table, Thead, Tbody, Th, Tr, Td} from 'reactable';
import _ from 'lodash';

import { fetchPlayerHeroStats } from '../actions/PlayerActions';
import { transformAllPlayerHerosData } from '../lib/PlayerHeroDataTransformer';
import { hotHeroes, coldHeroes, topFive } from '../lib/HeroStatsHelpers';
import HotColdTable from '../components/HotColdTable';
import TopFiveStatTable from '../components/TopFiveStatTable';
import LargeLoader from '../components/LargeLoader';
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
    if (!this.props.heroStats || this.props.isLoading) { return (<LargeLoader />); }

    let heroStats = transformAllPlayerHerosData(this.props.user, this.props.heroStats);

    let hotHeroesData = hotHeroes(heroStats.heroes);
    let coldHeroesData = coldHeroes(heroStats.heroes);
    let topFiveKDA = topFive(heroStats.heroes, 'kda');
    let topFiveXP = topFive(heroStats.heroes, 'xp');
    let topFiveHeroDmg = topFive(heroStats.heroes, 'heroDamage');
    let topFiveSiegeDmg = topFive(heroStats.heroes, 'siegeDamage');
    let topFiveDamageTaken = topFive(heroStats.heroes, 'damageTaken');
    let topFiveHealing = topFive(heroStats.heroes, 'healing');

    return (
      <div className="profile-page">
        <h1>{heroStats.player}</h1>
        <div className="hot-cold-container">
          <HotColdTable title="Hot Heroes" data={hotHeroesData} />
          <HotColdTable title="Cold Heroes" data={coldHeroesData} />
        </div>
        <div className="stats-tables">
          <TopFiveStatTable stats={topFiveKDA} stat="kda" label="T/D" />
          <TopFiveStatTable stats={topFiveXP} stat="xp" label="XP" />
        </div>
        <div className="stats-tables">
          <TopFiveStatTable stats={topFiveHeroDmg} stat="heroDamage" label="Hero Damage" />
          <TopFiveStatTable stats={topFiveSiegeDmg} stat="siegeDamage" label="Siege Damage" />
        </div>
        <div className="stats-tables">
          <TopFiveStatTable stats={topFiveDamageTaken} stat="damageTaken" label="Damage Taken" />
          <TopFiveStatTable stats={topFiveHealing} stat="healing" label="Healing" />
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
    isLoading: state.player.isLoading,
    user: state.session.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlayerHeroStats: fetchPlayerHeroStats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
