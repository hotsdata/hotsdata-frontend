import React from 'react';
import { Table, Thead, Th, Tr, Td } from 'reactable';

import { secondsToTimeString } from '../../lib/TimeUtils';
import { descSort } from '../../lib/TableSortFunctions';

class MiscStatsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let replay = this.props.replay;
    if (replay == null || !replay.replayid) {
      return (<div>Loading Replay Stats..</div>);
    }

    let statRows = replay.player_stats.map((playerStats) => {
      let playerInfo = replay.account_info[playerStats.playerId];
      let isWinner = playerInfo.gameResult == 1;

      return (
        <Tr key={playerInfo.name} className={(isWinner ? 'victory-row' : 'defeat-row')}>
          <Td column="player">{playerInfo.name}</Td>
          <Td column="hero">{playerStats.heroName}</Td>
          <Td column="regenGlobesTaken">{playerStats.regenGlobesTaken}</Td>
          <Td column="stunTime" value={playerStats.TimeStunningEnemyHeroes}>
            {secondsToTimeString(playerStats.TimeStunningEnemyHeroes)}
          </Td>
          <Td column="silenceTime" value={playerStats.TimeSilencingEnemyHeroes}>
            {secondsToTimeString(playerStats.TimeSilencingEnemyHeroes)}
          </Td>
          <Td column="ccTime" value={playerStats.TimeCCdEnemyHeroes}>
            {secondsToTimeString(playerStats.TimeCCdEnemyHeroes)}
          </Td>
          <Td column="rootTime" value={playerStats.TimeRootingEnemyHeroes}>
            {secondsToTimeString(playerStats.TimeRootingEnemyHeroes)}
          </Td>
          <Td column="clutchHeals" value={playerStats.ClutchHealsPerformed}>
            {playerStats.ClutchHealsPerformed}
          </Td>
          <Td column="timeOnFire" value={playerStats.OnFireTimeOnFire}>
            {secondsToTimeString(playerStats.OnFireTimeOnFire)}
          </Td>
        </Tr>
      )
    });

    let sort = [
      'player',
      'hero',
      { column: 'regenGlobesTaken', sortFunction: descSort },
      { column: 'stunTime', sortFunction: descSort },
      { column: 'silenceTime', sortFunction: descSort },
      { column: 'ccTime', sortFunction: descSort },
      { column: 'rootTime', sortFunction: descSort },
      { column: 'clutchHeals', sortFunction: descSort },
      { column: 'timeOnFire', sortFunction: descSort },
    ];

    return (
      <Table className="table sortable" sortable={sort}>
        <Thead>
          <Th column="player">Player</Th>
          <Th column="hero">Hero</Th>
          <Th column="regenGlobesTaken">Regen Globes</Th>
          <Th column="stunTime">Stun Time</Th>
          <Th column="silenceTime">Silence Time</Th>
          <Th column="ccTime">CC Time</Th>
          <Th column="rootTime">Root Time</Th>
          <Th column="clutchHeals">Clutch Heals</Th>
          <Th column="timeOnFire">Time on Fire</Th>
        </Thead>
        {statRows}
      </Table>
    )
  }

}

export default MiscStatsTable;
