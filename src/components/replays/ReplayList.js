import React, { Component } from 'react';
import _ from 'lodash';

import ReplayItem from './ReplayItem';

class ReplayList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.replays) {
      return (<div>Loading....</div>)
    }

    if (this.props.replays.length == 0) {
      return (<div>No Replays Found</div>)
    }

    let replayItems = this.props.replays.map((replay) => {
      return <ReplayItem key={replay.replayid} replay={replay} />
    })

    return (
      <table className="table" style={{width: '100%', marginTop: '12px'}}>
        <thead>
          <tr>
            <th>Hero</th>
            <th>Map</th>
            <th>Match Type</th>
            <th>Date/Time</th>
            <th>Duration</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {replayItems}
        </tbody>
      </table>
    )
  }
}

export default ReplayList;
