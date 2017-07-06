import React from 'react';

import HeroPortrait from './heroes/HeroPortrait';

const HotColdTable = (props) => {
  let rows = props.data.map((row) => {
    return (
      <tr key={row.hero}>
        <td><HeroPortrait hero={row.hero} /></td>
        <td>{row.hero}</td>
        <td>{row.games}</td>
        <td>{row.winRate}</td>
      </tr>
    )
  })

  return (
    <div className="hot-cold">
      <h2>{props.title}</h2>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Hero</th>
            <th>Games</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>

      </table>
    </div>
  )
}

export default HotColdTable;
