import React from 'react';

const MapStatsRow = ({playerInfo, playerStats}) => {
  let isWinner = playerInfo.gameResult == 1;

  return (
    <tr className={(isWinner ? 'victory-row' : 'defeat-row')}>
      <td>{playerInfo.name}</td>
      <td>{playerStats.heroName}</td>
      <td>{playerStats.RavenTributesCollected}</td>
      <td>{playerStats.CurseDamageDone}</td>
    </tr>
  )
}

export default MapStatsRow;
