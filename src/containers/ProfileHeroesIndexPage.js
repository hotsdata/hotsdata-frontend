import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {Table, Thead, Tbody, Th, Tr, Td} from 'reactable';
import _ from 'lodash';

import { fetchPlayerHeroStats } from '../actions/PlayerActions';

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
    console.log(this.props.heroStats);
    if (!this.props.heroStats) { return (<div>Loading...</div>); }

    let tableRows = this.props.heroStats.stats.map((row, i) => {
      let games = row.hero_stats[0].games;
      let wins = findStat(row.hero_stats, "match_won").value;
      let losses = findStat(row.hero_stats, "match_lost").value;
      let winRate = _.round(wins / games * 100, 1);

      return (
        <Tr key={row.hero}>
          <Td column="hero">
            <Link to={`/profile/heroes/${row.hero}`}>{row.hero}</Link>
          </Td>
          <Td column="games">{games}</Td>
          <Td column="winRate">{winRate}</Td>
          <Td column="takedowns">{_.round(findStat(row.hero_stats, "takedowns").value / games, 1)}</Td>
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
              <Th column="takedowns">Takedowns</Th>
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
