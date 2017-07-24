import React, { Component } from 'react';
import { Table, Thead, Th, Tr, Td } from 'reactable';

import { descSort } from '../../lib/TableSortFunctions';

class TeamFightingTable extends Component {
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
          <Td column="soloDeaths">{playerStats.soloDeathsCount}</Td>
          <Td column="outnumberedDeaths">{playerStats.OutnumberedDeaths}</Td>
          <Td column="heroDamage" value={playerStats.HeroDamage}>
            {playerStats.HeroDamage.toLocaleString()}
          </Td>
          <Td column="tfHeroDeamage" value={playerStats.TeamfightHeroDamage}>
            {playerStats.TeamfightHeroDamage.toLocaleString()}
          </Td>
          <Td column="damageTaken" value={playerStats.DamageTaken}>
            {playerStats.DamageTaken.toLocaleString()}
          </Td>
          <Td column="tfDamageTaken" value={playerStats.TeamfightDamageTaken}>
            {playerStats.TeamfightDamageTaken.toLocaleString()}
          </Td>
          <Td column="netTFDamage" value={(playerStats.TeamfightHeroDamage - playerStats.TeamfightDamageTaken)}>
            {(playerStats.TeamfightHeroDamage - playerStats.TeamfightDamageTaken).toLocaleString()}
          </Td>
          <Td column="healing" value={playerStats.Healing}>
            {playerStats.Healing.toLocaleString()}
          </Td>
          <Td column="tfHealingDone" value={playerStats.TeamfightHealingDone}>
            {playerStats.TeamfightHealingDone.toLocaleString()}
          </Td>
        </Tr>
      )
    });

    let sort = [
      'player',
      'hero',
      'soloDeaths',
      'outnumberedDeaths',
      { column: 'heroDamage', sortFunction: descSort },
      { column: 'tfHeroDeamage', sortFunction: descSort },
      { column: 'damageTaken', sortFunction: descSort },
      { column: 'tfDamageTaken', sortFunction: descSort },
      { column: 'netTFDamage', sortFunction: descSort },
      { column: 'healing', sortFunction: descSort },
      { column: 'tfHealingDone', sortFunction: descSort },
    ]

    return (
      <Table className="table sortable" sortable={sort}>
        <Thead>
          <Th column="player">Player</Th>
          <Th column="hero">Hero</Th>
          <Th column="soloDeaths">Solo Deaths</Th>
          <Th column="outnumberedDeaths">Outnumbered Deaths</Th>
          <Th column="heroDamage">Hero Damage</Th>
          <Th column="tfHeroDeamage">TF Hero Damage</Th>
          <Th column="damageTaken">Damage Taken</Th>
          <Th column="tfDamageTaken">TF Damage Taken</Th>
          <Th column="netTFDamage">Net TF Damage</Th>
          <Th column="healing">Healing</Th>
          <Th column="tfHealingDone">TF Healing Done</Th>
        </Thead>
        {statRows}
      </Table>
    )
  }
}

export default TeamFightingTable;
