import React from 'react';
import { Table, Thead, Th, Tr, Td } from 'reactable';

import { transformAllPlayerHerosData } from '../lib/PlayerHeroDataTransformer';
import { secondsToTimeString } from '../lib/TimeUtils';

class PlayerCompareTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    return (
      <Table className="table sortable striped" sortable={true} noDataText="Add Players to Compare">
        <Thead>
          <Th column="player">Player</Th>
          <Th column="games">Games</Th>
          <Th column="winrate">Win Rate</Th>
          <Th column="kda">T/D</Th>
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
    let hero = _.find(player.heroes, (h) => h.hero == this.props.hero);
    if (!hero) { return "No games found" }

    return (
      <Tr key={player.player_id}>
        <Td column="player">{player.player}</Td>
        <Td column="games">{hero.games}</Td>
        <Td column="winrate">{hero.winRate.toFixed(1)}</Td>
        <Td column="kda">{hero.kda.toFixed(1)}</Td>
        <Td column="takedowns">{hero.takedowns}</Td>
        <Td column="kills">{hero.kills}</Td>
        <Td column="assists">{hero.assists}</Td>
        <Td column="deaths">{hero.deaths}</Td>
        <Td column="timeDead">{hero.timeDead}</Td>
        <Td column="heroDamage">{hero.heroDamage.toLocaleString()}</Td>
        <Td column="siegeDamage">{hero.siegeDamage.toLocaleString()}</Td>
      </Tr>
    )
  }
}

export default PlayerCompareTable;
