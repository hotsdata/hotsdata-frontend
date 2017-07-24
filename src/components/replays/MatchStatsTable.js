import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Thead, Th, Tr, Td } from 'reactable';

import AwardImage from './AwardImage';
import { secondsToTimeString } from '../../lib/TimeUtils';

function findAward(playerStats) {
  let newMap = _.map(_.keys(playerStats), (key) => {
    if(_.includes(key, 'EndOfMatchAward')) {
      return { award: _.replace(key, "Boolean", ""), won: playerStats[key] };
    }
  });

  newMap = _.compact(newMap);

  return _.find(newMap, ['won', 1]);
}

function descSort(a,b) { return a < b ? 1 : -1}

class MatchStatsTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let replay = this.props.replay;
    if (replay == null || !replay.replayid) {
      return (<div>Loading Replay Stats..</div>);
    }

    let statRows = replay.player_stats.map((playerStats) => {
      let playerInfo = replay.account_info[playerStats.playerId];

      let isWinner = playerInfo.gameResult == 1;
      let award = findAward(playerStats);
      return (
        <Tr key={playerInfo.name} className={(isWinner ? 'victory-row' : 'defeat-row')}>
          <Td column="award" value={award}>
            <AwardImage award={award} />
          </Td>
          <Td column="player">{playerInfo.name}</Td>
          <Td column="hero">{playerStats.heroName}</Td>
          <Td column="takedowns">{playerStats.Takedowns}</Td>
          <Td column="kills">{playerStats.SoloKill}</Td>
          <Td column="assists">{playerStats.Assists}</Td>
          <Td column="deaths">{playerStats.Deaths}</Td>
          <Td column="timeDead">
            {secondsToTimeString(playerStats.secondsDead)}
          </Td>
          <Td column="heroDamage" value={playerStats.HeroDamage}>
            {playerStats.HeroDamage.toLocaleString()}
          </Td>
          <Td column="siegeDamage" value={playerStats.SiegeDamage}>
            {playerStats.SiegeDamage.toLocaleString()}
          </Td>
          <Td column="healing" value={playerStats.Healing}>
            {playerStats.Healing.toLocaleString()}
          </Td>
          <Td column="selfHealing" value={playerStats.SelfHealing}>
            {playerStats.SelfHealing.toLocaleString()}
          </Td>
          <Td column="damageTaken" value={playerStats.DamageTaken}>
            {playerStats.DamageTaken.toLocaleString()}
          </Td>
          <Td column="xp" value={playerStats.ExperienceContribution}>
            {playerStats.ExperienceContribution.toLocaleString()}
          </Td>
          <Td column="highKillStreak" value={playerStats.HighestKillStreak}>
            {playerStats.HighestKillStreak}
          </Td>
        </Tr>
      )

    });

    let sort = [
      'award',
      'player',
      'hero',
      { column: 'takedowns', sortFunction: descSort},
      { column: 'kills', sortFunction: descSort},
      { column: 'assists', sortFunction: descSort},
      'deaths',
      'timeDead',
      { column: 'heroDamage', sortFunction: descSort},
      { column: 'siegeDamage', sortFunction: descSort},
      { column: 'healing', sortFunction: descSort},
      { column: 'selfHealing', sortFunction: descSort},
      { column: 'damageTaken', sortFunction: descSort},
      { column: 'xp', sortFunction: descSort},
      { column: 'highKillStreak', sortFunction: descSort},
    ];

    return (
      <Table className="table sortable" sortable={sort}>
        <Thead>
          <Th column="award">Award</Th>
          <Th column="player">Player</Th>
          <Th column="hero">Hero</Th>
          <Th column="takedowns">Takedowns</Th>
          <Th column="kills">Kills</Th>
          <Th column="assists">Assists</Th>
          <Th column="deaths">Deaths</Th>
          <Th column="timeDead">Time Dead</Th>
          <Th column="heroDamage">Hero Damage</Th>
          <Th column="siegeDamage">Siege Damage</Th>
          <Th column="healing">Healing</Th>
          <Th column="selfHealing">Self Healing</Th>
          <Th column="damageTaken">Damage Taken</Th>
          <Th column="xp">XP</Th>
          <Th column="highKillStreak">Highest Kill Streak</Th>
        </Thead>
        {statRows}
      </Table>
    )
  }
}

export default MatchStatsTable;
