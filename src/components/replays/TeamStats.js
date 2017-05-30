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
              <th className="orange">Mercs</th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <th>Boss Taken</th>
              <td>{ts[0].bossTaken}</td>
              <td>{ts[1].bossTaken}</td>
            </tr>
            <tr>
              <th>Siege Camp Taken</th>
              <td>{ts[0].siegeCampTaken}</td>
              <td>{ts[1].siegeCampTaken}</td>
            </tr>
            <tr>
              <th>Mercs Taken</th>
              <td>{ts[0].mercsTaken}</td>
              <td>{ts[1].mercsTaken}</td>
            </tr>
            <tr>
              <th className="orange">Misc.</th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <th>Missed Regen Globes</th>
              <td>{ts[0].missedRegenGlobes}</td>
              <td>{ts[1].missedRegenGlobes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}

export default TeamStats;
