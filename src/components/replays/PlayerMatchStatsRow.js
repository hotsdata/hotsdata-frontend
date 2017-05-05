import React from 'react';

const PlayerMatchStatsRow = ({playerInfo, playerStats}) => {
  let isWinner = playerInfo.gameResult == 1;

  return (
    <tr className={(isWinner ? 'victory-row' : 'defeat-row')}>
      <td></td>
      <td>{playerInfo.name}</td>
      <td>{playerStats.heroName}</td>
      <td>{playerStats.Level}</td>
      <td>{playerStats.Takedowns}</td>
      <td>{playerStats.SoloKill}</td>
      <td>{playerStats.Assists}</td>
      <td>{playerStats.Deaths}</td>
      <td>{playerStats.HeroDamage.toLocaleString()}</td>
      <td>{playerStats.SiegeDamage.toLocaleString()}</td>
      <td>{playerStats.ExperienceContribution.toLocaleString()}</td>
      <td>{playerStats.HighestKillStreak}</td>
    </tr>
  )
}

export default PlayerMatchStatsRow;
