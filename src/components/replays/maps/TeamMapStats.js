import React from 'react';

import { TeamMapManifest } from './TeamMapManifest';

const TeamMapStats = (props) => {
  let mapName = props.replay.replay_data.mapName;
  let TeamMapStatsComponent = TeamMapManifest[mapName];

  if(TeamMapStatsComponent == null) {
    return (<div>No data available</div>);
  }

  return (
    <TeamMapStatsComponent replay={props.replay} />
  )
}

export default TeamMapStats;
