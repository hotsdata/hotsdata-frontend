import React from 'react';

const TopFiveStatTable = (props) => {
  let rows = props.stats.map((s,i) => {
    return (
      <tr key={i}>
        <td>{s.hero}</td>
        <td>{s.games}</td>
        <td>{s[props.stat].toLocaleString()}</td>
      </tr>
    )
  })
  return (
    <div className="stat-table">
      <h2>Top {props.label}</h2>
      <table className="table striped">
        <thead>
          <tr>
            <th>Hero</th>
            <th>Games</th>
            <th>{props.label}</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default TopFiveStatTable;
