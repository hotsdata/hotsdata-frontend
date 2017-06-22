import React from 'react';
import _ from 'lodash';

import { secondsToTimeString } from '../../lib/TimeUtils';
import AwardImage from './AwardImage';

function findAward(playerStats) {
  let newMap = _.map(_.keys(playerStats), (key) => {
    if(_.includes(key, 'EndOfMatchAward')) {
      return { award: _.replace(key, "Boolean", ""), won: playerStats[key] };
    }
  });

  newMap = _.compact(newMap);
  // console.log('newMap', newMap);

  return _.find(newMap, ['won', 1]);
}

const PlayerMatchStatsRow = ({playerInfo, playerStats}) => {
  let isWinner = playerInfo.gameResult == 1;
  let award = findAward(playerStats);
  console.log(playerInfo.name, award);

  return (
    <tr className={(isWinner ? 'victory-row' : 'defeat-row')}>
      <td><AwardImage award={award} /></td>
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
