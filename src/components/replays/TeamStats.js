import React, { Component } from 'react';

import TeamExperienceTable from './TeamExperienceTable';

class TeamStats extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let replay = this.props.replay;
    let ts = replay.teams_stats;

    return (
      <div className="team-stats-wrapper">
        <table className="table vertical-team-table">
          <thead>
            <tr>
              <th></th>
              <th className="blue-team">
                <h2>{ts[0].teamId}</h2>
                <h5>{ts[0].isWinner ? "Winner" : "Loser"}</h5>
              </th>
              <th className="red-team">
                <h2>{ts[1].teamId}</h2>
                <h5>{ts[1].isWinner ? "Winner" : "Loser"}</h5>
              </th>
            </tr>
          </thead>
          <TeamExperienceTable team_stats={ts} />
          <tbody>
            <tr>
              <th></th>
              <th>Mercs</th>
              <th></th>
            </tr>
            <tr>
              <td>{ts[0].bossTaken}</td>
              <th>Boss Taken</th>
              <td>{ts[1].bossTaken}</td>
            </tr>
          </tbody>
        </table>
        <div>
          Map Specific
        </div>
        <div>
          Misc
        </div>
      </div>
    )
  }

}

export default TeamStats;
