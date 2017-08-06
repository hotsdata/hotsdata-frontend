import React from 'react';
import { Table, Thead, Th, Tr, Td } from 'reactable';

import { transformAllPlayerHerosData } from '../lib/PlayerHeroDataTransformer';
import { secondsToTimeString } from '../lib/TimeUtils';
import { descSort } from '../lib/TableSortFunctions';

class PlayerCompareTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    let sort = [
      'player',
      { column: 'games', sortFunction: descSort },
      { column: 'winrate', sortFunction: descSort },
      { column: 'kda', sortFunction: descSort },
      { column: 'takedowns', sortFunction: descSort },
      { column: 'kills', sortFunction: descSort },
      { column: 'assists', sortFunction: descSort },
      'deaths',
      'timeDead',
      { column: 'heroDamage', sortFunction: descSort },
      { column: 'siegeDamage', sortFunction: descSort },
      { column: 'healing', sortFunction: descSort },
      { column: 'selfHealing', sortFunction: descSort },
      { column: 'xp', sortFunction: descSort },
    ]

    return (
      <Table className="table sortable striped" sortable={sort} noDataText="Add Players to Compare">
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
          <Th column="healing">Healing</Th>
          <Th column="selfHealing">Self Healing</Th>
          <Th column="xp">XP</Th>
          <Th column="remove"> </Th>
        </Thead>
        {this.props.players.map(player => this.renderRow(player))}
      </Table>
    )
  }

  renderRow(player) {
    let hero = _.find(player.heroes, (h) => h.hero == this.props.hero);
    if (!hero) {
      return (
        <Tr key={player.player_id}>
          <Td column="player">{player.player}</Td>
          <Td column="games">0</Td>
          <Td column="remove">
            <button className="btn-remove"
              onClick={() => this.props.onRemovePlayer(player.player_id)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </Td>
        </Tr>
      )
    }

    return (
      <Tr key={player.player_id}>
        <Td column="player">{player.player}</Td>
        <Td column="games">{hero.games}</Td>
        <Td column="winrate" value={hero.winRate}>
          {hero.winRate.toFixed(1)}
        </Td>
        <Td column="kda" value={hero.kda}>
          {hero.kda.toFixed(1)}
        </Td>
        <Td column="takedowns">{hero.takedowns}</Td>
        <Td column="kills">{hero.kills}</Td>
        <Td column="assists">{hero.assists}</Td>
        <Td column="deaths">{hero.deaths}</Td>
        <Td column="timeDead">{hero.timeDead}</Td>
        <Td column="heroDamage" value={hero.heroDamage}>
          {hero.heroDamage.toLocaleString()}
        </Td>
        <Td column="siegeDamage" value={hero.siegeDamage}>
          {hero.siegeDamage.toLocaleString()}
        </Td>
        <Td column="healing" value={hero.healing}>
          {hero.healing.toLocaleString()}
        </Td>
        <Td column="selfHealing" value={hero.selfHealing}>
          {hero.selfHealing.toLocaleString()}
        </Td>
        <Td column="xp" value={hero.xp}>
          {hero.xp.toLocaleString()}
        </Td>
        <Td column="remove">
          <button className="btn-remove"
            onClick={() => this.props.onRemovePlayer(player.player_id)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </Td>
      </Tr>
    )
  }
}

export default PlayerCompareTable;
