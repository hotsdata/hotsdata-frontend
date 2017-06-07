import React from 'react';

const SiegeStatsRow = ({playerInfo, playerStats}) => {
  let isWinner = playerInfo.gameResult == 1;

  return (
    <tr className={(isWinner ? 'victory-row' : 'defeat-row')}>
      <td>{playerInfo.name}</td>
      <td>{playerStats.heroName}</td>
      <td>{playerStats.CreepDamage.toLocaleString()}</td>
      <td>{playerStats.MinionDamage.toLocaleString()}</td>
      <td>{playerStats.fortsDestroyed}</td>
      <td>{playerStats.StructureDamage}</td>
      <td>{playerStats.killCountMinions}</td>
      <td>{playerStats.killCountBuildings}</td>
    </tr>
  )
}

export default SiegeStatsRow;
