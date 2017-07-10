import React from 'react';

const PlayerCompareTable = (props) => {
  if (props.players.length == 0) { return (<div>No Data</div>) }

  console.log('players', props.players);

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          { props.players.map((player, i) => {
            return (<th key={i}>{player.player_name}</th>)
          })}
        </tr>
      </thead>
    </table>
  )

}

export default PlayerCompareTable;
