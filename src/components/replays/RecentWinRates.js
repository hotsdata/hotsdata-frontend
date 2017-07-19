import React from 'react';

function winRate(replays) {
  let wins = _.filter(replays, (replay) => replay.matchresult === "Victory").length
  let losses = _.filter(replays, (replay) => replay.matchresult === "Defeat").length

  return {
    wins: wins,
    losses: losses,
    games: wins+losses,
    winRate: Math.round((wins / (wins+losses)) * 100)
  }
}

const RecentWinRates = ({replays}) => {

  let gameIntervals = [10, 25, 50, 100];
  let winRateRows = gameIntervals.map((num, i) => {
    let slicedReplays = replays.slice(0, num);
    if (slicedReplays.length < num && slicedReplays.length <= gameIntervals[i-1]) {
      return;
    }
    let winRates = winRate(slicedReplays);
    return (
      <tr key={num} className="neutral-row">
        <td>{winRates.games}</td>
        <td>{winRates.wins}-{winRates.losses}</td>
        <td>{winRates.winRate}</td>
      </tr>
    )
  });

  return (
    <div className="win-rates">
      <table className="table">
        <thead>
          <tr>
            <th>Last X Games</th>
            <th>Wins - Losses</th>
            <th>Win %</th>
          </tr>
        </thead>
        <tbody>
          {winRateRows}
        </tbody>
      </table>
    </div>
  )
}

export default RecentWinRates;
