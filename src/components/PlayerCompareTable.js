import React from 'react';
import { Table, Thead, Th, Tr, Td } from 'reactable';

import { transformPlayerHeroStats } from '../lib/PlayerHeroStatsDataTransformer';
import { secondsToTimeString } from '../lib/TimeUtils';

class PlayerCompareTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    return (
      <Table className="table" sortable={true} noDataText="Add Players to Compare">
        <Thead>
          <Th column="player">Player</Th>
          <Th column="games">Games</Th>
          <Th column="winrate">Win Rate</Th>
          <Th column="takedowns">Takedowns</Th>
          <Th column="kills">Kills</Th>
          <Th column="assists">Assists</Th>
          <Th column="deaths">Deaths</Th>
          <Th column="timeDead">Time Dead</Th>
          <Th column="heroDamage">Hero Damage</Th>
          <Th column="siegeDamage">Siege Damage</Th>
        </Thead>
        {this.props.players.map(player => this.renderRow(player))}
      </Table>
    )
  }

  renderRow(player) {
    let {hero, hero_stats} = _.find(player.stats, (s) => s.hero == this.props.hero);
    if (!hero) { return "No games found" }
    let games = hero_stats[0].games;
    let stats = transformPlayerHeroStats(hero_stats);
    console.log(stats);

    return (
      <Tr key={player.player_id}>
        <Td column="player">{player.player_name}</Td>
        <Td column="games">{games}</Td>
        <Td column="winrate">N/A</Td>
        <Td column="takedowns">{stats.takedowns}</Td>
        <Td column="kills">{stats.killcount}</Td>
        <Td column="assists">{stats.assists}</Td>
        <Td column="deaths">{stats.deaths}</Td>
        <Td column="timeDead">{secondsToTimeString(stats.timespentdead)}</Td>
        <Td column="heroDamage">{stats.herodamage.toLocaleString()}</Td>
        <Td column="siegeDamage">{stats.siegedamage.toLocaleString()}</Td>
      </Tr>
    )
  }
}

export default PlayerCompareTable;
