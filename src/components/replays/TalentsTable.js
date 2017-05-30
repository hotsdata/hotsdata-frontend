import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

function talentPath(talent_icon) {
  return `https://s3-us-west-2.amazonaws.com/openlogs-icons/${talent_icon}.png`
}

class TalentsTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.talents == null) {
      return (<div>Loading Talents...</div>)
    }

    let orderedTalents = _.sortBy(this.props.talents, ['team']);
    console.log(orderedTalents);

    let talentRows = orderedTalents.map((playerTalents, i) => {
      let talentCells = playerTalents.talents.map((talent, j) => {
        return (
          <td
            key={j}
            alt={talent.talent_name}
            title={`${talent.talent_name}: ${talent.description}`}>
            <img className="talent-image" src={talentPath(talent.talent_icon)} />
          </td>
        )
      });

      return (
        <tr key={i} className={playerTalents.team == 0 ? 'blue-team' : 'red-team'}>
          <td>{playerTalents.hero}</td>
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
