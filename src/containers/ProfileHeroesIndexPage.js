import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {Table, Thead, Tbody, Th, Tr, Td} from 'reactable';
import _ from 'lodash';

import { fetchPlayerHeroStats } from '../actions/PlayerActions';
import { transformAllPlayerHerosData } from '../lib/PlayerHeroDataTransformer';

function findStat(stat_array, stat) {
  return _.find(stat_array, (s) => s.metric == stat)
}

class ProfileHeroesIndexPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchPlayerHeroStats();
  }

  render() {
    if (!this.props.heroStats || this.props.isLoading) { return (<div>Loading...</div>); }
    let heroStats = transformAllPlayerHerosData(this.props.heroStats);

    let tableRows = heroStats.heroes.map((hero, i) => {
      return (
        <Tr key={hero.hero}>
          <Td column="hero" value={hero.hero}>
            <Link to={`/profile/heroes/${hero.hero}`}>{hero.hero}</Link>
          </Td>
          <Td column="games">{hero.games}</Td>
          <Td column="winRate">{hero.winRate.toFixed(1)}</Td>
          <Td column="kda" value={hero.kda}>{hero.kda.toFixed(1)}</Td>
          <Td column="takedowns" value={hero.takedowns}>{hero.takedowns.toFixed(1)}</Td>
          <Td column="kills" value={hero.kills}>{hero.kills.toFixed(1)}</Td>
          <Td column="deaths" value={hero.deaths}>{hero.deaths.toFixed(1)}</Td>
          <Td column="timeDead">{hero.timeDead}</Td>
          <Td column="heroDamage" value={hero.heroDamage}>{hero.heroDamage.toLocaleString()}</Td>
          <Td column="siegeDamage" value={hero.siegeDamage}>{hero.siegeDamage.toLocaleString()}</Td>
          <Td column="healing" value={hero.healing}>{hero.healing.toLocaleString()}</Td>
          <Td column="selfHealing" value={hero.selfHealing}>{hero.selfHealing.toLocaleString()}</Td>
          <Td column="damageTaken" value={hero.damageTaken}>{hero.damageTaken.toLocaleString()}</Td>
          <Td column="xp" value={hero.xp}>{hero.xp.toLocaleString()}</Td>
        </Tr>
      )
    });

    return (
      <div className="profile-heroes-page">
        <div className="filters">
        </div>
        <div className="heroes-table">
          <Table className="table sortable striped" sortable={true}>
            <Thead>
              <Th column="hero">Hero</Th>
              <Th column="games">Games</Th>
              <Th column="winRate">Win Rate</Th>
              <Th column="kda">T/D</Th>
              <Th column="takedowns">Takedowns</Th>
              <Th column="kills">Kills</Th>
              <Th column="deaths">Deaths</Th>
              <Th column="timeDead">Time Dead</Th>
              <Th column="heroDamage">Hero Damage</Th>
              <Th column="siegeDamage">Siege Damage</Th>
              <Th column="healing">Healing</Th>
              <Th column="selfHealing">Self Healing</Th>
              <Th column="damageTaken">Damage Taken</Th>
              <Th column="xp">XP</Th>
            </Thead>
            {tableRows}
          </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeroesIndexPage);
