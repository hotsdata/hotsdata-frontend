import React from 'react';

const PlayerMatchStatsRow = ({playerInfo, playerStats}) => {
  let isWinner = playerInfo.gameResult == 1;

  return (
    <tr className={(isWinner ? 'victory' : 'defeat')}>
      <td>{playerInfo.name}</td>
      <td>{playerStats.heroName}</td>
      <td>{playerStats.Level}</td>
      <td>{playerStats.Takedowns}</td>
      <td>{playerStats.SoloKill}</td>
      <td>{playerStats.Assists}</td>
      <td>{playerStats.Deaths}</td>
      <td>{playerStats.SiegeDamage}</td>
      <td>{playerStats.HeroDamage}</td>
      <td>{playerStats.ExperienceContribution}</td>
    </tr>
  )
}

export default PlayerMatchStatsRow;
