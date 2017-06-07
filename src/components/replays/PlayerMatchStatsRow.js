import React from 'react';

import { secondsToTimeString } from '../../lib/TimeUtils';

const PlayerMatchStatsRow = ({playerInfo, playerStats}) => {
  let isWinner = playerInfo.gameResult == 1;

  return (
    <tr className={(isWinner ? 'victory-row' : 'defeat-row')}>
      <td></td>
      <td>{playerInfo.name}</td>
      <td>{playerStats.heroName}</td>
      <td>{playerStats.Takedowns}</td>
      <td>{playerStats.SoloKill}</td>
      <td>{playerStats.Assists}</td>
      <td>{playerStats.Deaths}</td>
      <td>{secondsToTimeString(playerStats.secondsDead)}</td>
      <td>{playerStats.HeroDamage.toLocaleString()}</td>
      <td>{playerStats.SiegeDamage.toLocaleString()}</td>
      <td>{playerStats.Healing.toLocaleString()}</td>
      <td>{playerStats.SelfHealing.toLocaleString()}</td>
      <td>{playerStats.DamageTaken.toLocaleString()}</td>
      <td>{playerStats.ExperienceContribution.toLocaleString()}</td>
      <td>{playerStats.HighestKillStreak}</td>
    </tr>
  )
}

export default PlayerMatchStatsRow;
