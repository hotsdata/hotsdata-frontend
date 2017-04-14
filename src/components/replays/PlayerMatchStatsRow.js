import React from 'react';
import { Table } from 'semantic-ui-react';

const PlayerMatchStatsRow = ({playerStats}) => {
  return (
    <Table.Row>
      <Table.Cell>{playerStats.heroName}</Table.Cell>
      <Table.Cell>{playerStats.soloKills}</Table.Cell>
      <Table.Cell>{playerStats.deathCount}</Table.Cell>
      <Table.Cell>{playerStats.totalSiegeDmg}</Table.Cell>
      <Table.Cell>{playerStats.totalHeroDmg}</Table.Cell>
    </Table.Row>
  )
}

export default PlayerMatchStatsRow;
