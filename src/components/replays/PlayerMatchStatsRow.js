import React from 'react';
import { Table } from 'semantic-ui-react';

const PlayerMatchStatsRow = ({playerStats}) => {
  return (
    <Table.Row>
      <Table.Cell>{playerStats.player}</Table.Cell>
      <Table.Cell>{playerStats.hero}</Table.Cell>
      <Table.Cell>{playerStats.heroLevel}</Table.Cell>
      <Table.Cell>{playerStats.takedowns}</Table.Cell>
      <Table.Cell>{playerStats.soloKills}</Table.Cell>
      <Table.Cell>{playerStats.assists}</Table.Cell>
      <Table.Cell>{playerStats.deathCount}</Table.Cell>
      <Table.Cell>{playerStats.totalSiegeDmg}</Table.Cell>
      <Table.Cell>{playerStats.totalHeroDmg}</Table.Cell>
      <Table.Cell>{playerStats.totalXP}</Table.Cell>
    </Table.Row>
  )
}

export default PlayerMatchStatsRow;
