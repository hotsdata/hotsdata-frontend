import React, { Component } from 'react';
import { connect } from 'react-redux';

class TalentsTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.talents == null) {
      return (<div>Loading Talents...</div>)
    }

    let talentRows = this.props.talents.map((playerTalents, i) => {
      let talentCells = playerTalents.talents.map((talent, j) => {
        return (
          <td key={j}>{talent.talent_name}</td>
        )
      });

      return (
        <tr key={i}>
          <td>Sonya</td>
          {talentCells}
        </tr>
      )
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Hero</th>
            <th>1</th>
            <th>4</th>
            <th>7</th>
            <th>10</th>
            <th>13</th>
            <th>16</th>
            <th>20</th>
          </tr>
        </thead>
        <tbody>
          {talentRows}
        </tbody>
      </table>
    )
  }
}

export default TalentsTable;
