import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import PlayerProfileLink from '../players/PlayerProfileLink';

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

    let talentRows = orderedTalents.map((playerTalents, i) => {
      let talents = _.sortBy(playerTalents.talents, ['talent_seconds']);
      let talentCells = [0,1,2,3,4,5,6].map((j) => {
        let talent = talents[j];
        if(talent != null) {
          return (
            <td
              key={j}
              alt={talent.talent_name}
              title={`${talent.talent_name}: ${talent.description}`}>
              <img className="talent-image" src={talentPath(talent.talent_icon)} />
            </td>
          )
        } else {
          return (<td key={j}></td>);
        }
      });

      return (
        <tr key={i} className={playerTalents.matchResult.toLowerCase() + '-row'}>
          <td>{playerTalents.player}</td>
          <td>{playerTalents.hero}</td>
          {talentCells}
        </tr>
      )
    });

    return (
      <div className="talents">
        <table className="table">
          <thead>
            <tr>
              <th>Player</th>
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
      </div>
    )
  }
}

export default TalentsTable;
