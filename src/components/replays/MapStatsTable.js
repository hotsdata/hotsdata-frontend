import React, { Component } from 'react';

import MapManifest from './maps/MapManifest';

class MapStatsTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let replay = this.props.replay;

    if (replay == null || !replay.replayid) {
      return (<div>Loading Replay Stats..</div>);
    }

    let mapName = replay.replay_data.mapName;
    let MapStatsTable = MapManifest[mapName];

    if (MapStatsTable == null) {
      return (<div>No data available for {mapName}</div>);
    }

    return (
      <MapStatsTable replay={replay} />
    )
  }
}

export default MapStatsTable;
