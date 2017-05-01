import React from 'react';
import { Table } from 'semantic-ui-react';

const PlayerMatchStatsRow = ({playerInfo, playerStats}) => {
  let isWinner = playerInfo.gameResult == 1;
  
  return (
    <Table.Row className={(isWinner ? 'victory' : 'defeat')}>
      <Table.Cell>{playerInfo.name}</Table.Cell>
      <Table.Cell>{playerStats.heroName}</Table.Cell>
      <Table.Cell>{playerStats.Level}</Table.Cell>
      <Table.Cell>{playerStats.Takedowns}</Table.Cell>
      <Table.Cell>{playerStats.SoloKill}</Table.Cell>
      <Table.Cell>{playerStats.Assists}</Table.Cell>
      <Table.Cell>{playerStats.Deaths}</Table.Cell>
      <Table.Cell>{playerStats.SiegeDamage}</Table.Cell>
      <Table.Cell>{playerStats.HeroDamage}</Table.Cell>
      <Table.Cell>{playerStats.ExperienceContribution}</Table.Cell>
    </Table.Row>
  )
}

export default PlayerMatchStatsRow;
