import React, { Component } from 'react';

import TimeUtils from '../../lib/TimeUtils';

class TeamTombOfTheSpiderQueen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ts = this.props.replay.teams_stats;

    return (
      <div>
        <table className="table vertical-team-table">
          <caption>Top Spider</caption>
          <thead>
            <tr>
              <th></th>
              <th>Blue Team</th>
              <th>Red Team</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Alive Time</th>
              <td>{ts[0].spiderBossesNorthTotalAliveTime}</td>
              <td>{ts[1].spiderBossesNorthTotalAliveTime}</td>
            </tr>
            <tr>
              <th>Buildings Killed</th>
              <td>{ts[0].totalBuildingsKilledDuringNorthSpider}</td>
              <td>{ts[1].totalBuildingsKilledDuringNorthSpider}</td>
            </tr>
            <tr>
              <th>Units Killed</th>
              <td>{ts[0].totalUnitsKilledDuringNorthSpider}</td>
              <td>{ts[1].totalUnitsKilledDuringNorthSpider}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TeamTombOfTheSpiderQueen;
