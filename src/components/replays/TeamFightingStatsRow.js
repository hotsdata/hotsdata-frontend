import React from 'react';

const TeamFightingStatsRow = ({playerInfo, playerStats}) => {
  let isWinner = playerInfo.gameResult == 1;

  return (
    <tr className={(isWinner ? 'victory-row' : 'defeat-row')}>
      <td>{playerInfo.name}</td>
      <td>{playerStats.heroName}</td>
      <td>{playerStats.soloDeathsCount}</td>
      <td>{playerStats.OutnumberedDeaths}</td>
      <td>{playerStats.HeroDamage.toLocaleString()}</td>
      <td>{playerStats.TeamfightHeroDamage.toLocaleString()}</td>
      <td>{playerStats.DamageTaken.toLocaleString()}</td>
      <td>{playerStats.TeamfightDamageTaken.toLocaleString()}</td>
      <td>{playerStats.Healing.toLocaleString()}</td>
      <td>{playerStats.TeamfightHealingDone.toLocaleString()}</td>
    </tr>
  )
}

export default TeamFightingStatsRow;
