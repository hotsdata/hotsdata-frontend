import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Thead, Th, Tr, Td } from 'reactable';

import { descSort } from '../../lib/TableSortFunctions';

class MatchSiegeStats extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let replay = this.props.replay;
    if (replay == null || !replay.replayid) {
      return (<div>Loading Replay Stats..</div>);
    }

    let statRows = replay.player_stats.map((playerStats) => {
      let playerInfo = replay.account_info[playerStats.playerId];
      let isWinner = playerInfo.gameResult == 1;

      return (
        <Tr key={playerInfo.name} className={(isWinner ? 'victory-row' : 'defeat-row')}>
          <Td column="player">{playerInfo.name}</Td>
          <Td column="hero">{playerStats.heroName}</Td>
          <Td column="creepDamage" value={playerStats.CreepDamage}>
            {playerStats.CreepDamage.toLocaleString()}
          </Td>
          <Td column="minionDamage" value={playerStats.MinionDamage}>
            {playerStats.MinionDamage.toLocaleString()}
          </Td>
          <Td column="structureDamage" value={playerStats.StructureDamage}>
            {playerStats.StructureDamage}
          </Td>
          <Td column="killCountMinions" value={playerStats.killCountMinions}>
            {playerStats.killCountMinions}
          </Td>
          <Td column="killCountBuildings" value={playerStats.killCountBuildings}>
            {playerStats.killCountBuildings}
          </Td>
        </Tr>
      )
    });

    let sort = [
      'player',
      'hero',
      { column: 'creepDamage', sortFunction: descSort },
      { column: 'minionDamage', sortFunction: descSort },
      { column: 'structureDamage', sortFunction: descSort },
      { column: 'killCountMinions', sortFunction: descSort },
      { column: 'killCountBuildings', sortFunction: descSort }
    ];

    return (
      <Table className="table sortable" sortable={sort}>
        <Thead>
          <Th column="player">Player</Th>
          <Th column="hero">Hero</Th>
          <Th column="creepDamage">Creep Damage</Th>
          <Th column="minionDamage">Minion Damage</Th>
          <Th column="structureDamage">Structure Damage</Th>
          <Th column="killCountMinions">Minions Killed</Th>
          <Th column="killCountBuildings">Buildings Destroyed</Th>
        </Thead>
        {statRows}
      </Table>
    )
  }
}

export default MatchSiegeStats;
