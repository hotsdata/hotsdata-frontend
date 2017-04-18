import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchReplays } from '../../actions/replay_actions';
import { Table } from 'semantic-ui-react';
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
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Hero</Table.HeaderCell>
            <Table.HeaderCell>Map</Table.HeaderCell>
            <Table.HeaderCell>Date/Time</Table.HeaderCell>
            <Table.HeaderCell>View</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {replayItems}
        </Table.Body>
      </Table>
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
