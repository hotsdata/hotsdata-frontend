import React, { Component } from 'react';

import { secondsToTimeString } from '../../../lib/TimeUtils';

class TeamTombOfTheSpiderQueen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ts = this.props.replay.teams_stats;

    return (
      <div>
        <table className="table vertical-team-table">
          <thead>
            <tr>
              <th></th>
              <th>Blue Team ({ts[0].summonedSpiderBosses/3} summons)</th>
              <th>Red Team ({ts[1].summonedSpiderBosses/3} summons)</th>
            </tr>
          </thead>
          <tbody>
            <tr><th colSpan="3">Top Spider</th></tr>
            <tr>
              <th>Alive Time</th>
              <td>{secondsToTimeString(ts[0].spiderBossesNorthTotalAliveTime)}</td>
              <td>{secondsToTimeString(ts[1].spiderBossesNorthTotalAliveTime)}</td>
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
            <tr><th colSpan="3">Middle Spider</th></tr>
            <tr>
              <th>Alive Time</th>
              <td>{secondsToTimeString(ts[0].spiderBossesCenterTotalAliveTime)}</td>
              <td>{secondsToTimeString(ts[1].spiderBossesCenterTotalAliveTime)}</td>
            </tr>
            <tr>
              <th>Buildings Killed</th>
              <td>{ts[0].totalBuildingsKilledDuringCenterSpider}</td>
              <td>{ts[1].totalBuildingsKilledDuringCenterSpider}</td>
            </tr>
            <tr>
              <th>Units Killed</th>
              <td>{ts[0].totalUnitsKilledDuringCenterSpider}</td>
              <td>{ts[1].totalUnitsKilledDuringCenterSpider}</td>
            </tr>
            <tr><th colSpan="3">Bottom Spider</th></tr>
            <tr>
              <th>Alive Time</th>
              <td>{secondsToTimeString(ts[0].spiderBossesSouthTotalAliveTime)}</td>
              <td>{secondsToTimeString(ts[1].spiderBossesSouthTotalAliveTime)}</td>
            </tr>
            <tr>
              <th>Buildings Killed</th>
              <td>{ts[0].totalBuildingsKilledDuringSouthSpider}</td>
              <td>{ts[1].totalBuildingsKilledDuringSouthSpider}</td>
            </tr>
            <tr>
              <th>Units Killed</th>
              <td>{ts[0].totalUnitsKilledDuringSouthSpider}</td>
              <td>{ts[1].totalUnitsKilledDuringSouthSpider}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TeamTombOfTheSpiderQueen;
