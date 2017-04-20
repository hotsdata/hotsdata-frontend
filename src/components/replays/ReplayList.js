import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchReplays } from '../../actions/replay_actions';
import ReplayItem from './ReplayItem';

class ReplayList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchReplays();
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
      <table className="table">
        <thead>
          <tr>
            <th>Hero</th>
            <th>Map</th>
            <th>Date/Time</th>
            <th>Duration</th>
            <th>Result</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {replayItems}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    replays: _.take(state.replays.allReplays, 50)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchReplays: fetchReplays }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplayList);
