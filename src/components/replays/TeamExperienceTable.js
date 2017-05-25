import React from 'react';

const TeamExperienceTable = (props) => {
  let ts = props.team_stats;

  return (
    <tbody>
      <tr colSpan="3">
        <th>Team Experience</th>
      </tr>
      <tr>
        <th>Total XP</th>
        <td>{ts[0].totalXP}</td>
        <td>{ts[1].totalXP}</td>
      </tr>
      <tr>
        <th>Heros XP</th>
        <td>{ts[0].totalHeroXP}</td>
        <td>{ts[1].totalHeroXP}</td>
      </tr>
      <tr>
        <th>Creep XP</th>
        <td>{ts[0].totalCreepXP}</td>
        <td>{ts[1].totalCreepXP}</td>
      </tr>
      <tr>
        <th>Minion XP</th>
        <td>{ts[0].totalMinionXP}</td>
        <td>{ts[1].totalMinionXP}</td>
      </tr>
      <tr>
        <th>Structure XP</th>
        <td>{ts[0].totalStructureXP}</td>
        <td>{ts[1].totalStructureXP}</td>
      </tr>
      <tr>
        <th>Trickle XP</th>
        <td>{ts[0].totalTrickleXP}</td>
        <td>{ts[1].totalTrickleXP}</td>
      </tr>
    </tbody>
  )
}

export default TeamExperienceTable;
