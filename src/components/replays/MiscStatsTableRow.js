import React from 'react';

import { secondsToTimeString } from '../../lib/TimeUtils';

const MiscStatsTableRow = ({playerInfo, playerStats}) => {
  let isWinner = playerInfo.gameResult == 1;

  return (
    <tr className={(isWinner ? 'victory-row' : 'defeat-row')}>
      <td>{playerInfo.name}</td>
      <td>{playerStats.heroName}</td>
      <td>{playerStats.regenGlobesTaken}</td>
      <td>{secondsToTimeString(playerStats.TimeStunningEnemyHeroes)}</td>
      <td>{secondsToTimeString(playerStats.TimeSilencingEnemyHeroes)}</td>
      <td>{secondsToTimeString(playerStats.TimeCCdEnemyHeroes)}</td>
      <td>{secondsToTimeString(playerStats.TimeRootingEnemyHeroes)}</td>
      <td>{playerStats.ClutchHealsPerformed}</td>
      <td>{secondsToTimeString(playerStats.OnFireTimeOnFire)}</td>
    </tr>
  )
}

export default MiscStatsTableRow;
