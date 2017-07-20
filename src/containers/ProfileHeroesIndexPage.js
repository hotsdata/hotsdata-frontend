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
          <Td column="hero">
            <Link to={`/profile/heroes/${hero.hero}`}>{hero.hero}</Link>
          </Td>
          <Td column="games">{hero.games}</Td>
          <Td column="winRate">{hero.winRate}</Td>
          <Td column="kda">{hero.kda}</Td>
          <Td column="takedowns">{hero.takedowns}</Td>
          <Td column="kills">{hero.kills}</Td>
          <Td column="deaths">{hero.deaths}</Td>
          <Td column="timeDead">{hero.timeDead}</Td>
          <Td column="heroDamage">{hero.heroDamage}</Td>
          <Td column="siegeDamage">{hero.siegeDamage}</Td>
          <Td column="healing">{hero.healing}</Td>
          <Td column="selfHealing">{hero.selfHealing}</Td>
          <Td column="damageTaken">{hero.damageTaken}</Td>
          <Td column="xp">{hero.xp}</Td>
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
