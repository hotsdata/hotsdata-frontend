import React, { Component } from 'react';

class TeamTowersOfDoom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ts = this.props.replay.teams_stats;
    console.log(ts);

    return (
      <div>
        <table className="table vertical-team-table">
          <thead>
            <tr>
              <th></th>
              <th>Blue Team</th>
              <th>Red Team</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <th>Altars Captured</th>
              <td>{ts[0].totalAltarsCaptured}</td>
              <td>{ts[1].totalAltarsCaptured}</td>
            </tr>
            <tr>
              <th>Keeps Captured</th>
              <td>{ts[0].totalTowersCaptured}</td>
              <td>{ts[1].totalTowersCaptured}</td>
            </tr>
            <tr>
              <th>Bosses Captured</th>
              <td>{ts[0].bossTaken}</td>
              <td>{ts[1].bossTaken}</td>
            </tr>
            <tr>
              <th>Shots fired with altars</th>
              <td>{ts[0].towersCapturedAtFire.reduce(function(sum, value) {return sum + value;}, 0)}</td>
              <td>{ts[1].towersCapturedAtFire.reduce(function(sum, value) {return sum + value;}, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TeamTowersOfDoom;
