import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchReplays } from '../actions/replay_actions';
import ReplayList from '../components/replays/ReplayList';

class ReplaysPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: {
        term: ''
      }
    }

    this.filterReplays = this.filterReplays.bind(this);
  }

  componentWillMount() {
    this.props.fetchReplays();
  }

  filterReplays(e) {
    let newFilter = {
      term: this.refs.term.value
    }
    console.log(newFilter);
    this.setState({...this.state, filter: newFilter})
  }

  render() {

    let filter = this.state.filter;

    let filteredReplays = this.props.replays.filter((replay) => {
      return filter.term === '' ||
             _.includes(replay.heroname.toLowerCase(), filter.term.toLowerCase()) ||
             _.includes(replay.mapname.toLowerCase(), filter.term.toLowerCase())
    })

    return (
      <div>
        <h2>Replays</h2>
        <div className="replay-filters">
          <input
            type="text"
            size="50"
            ref="term"
            placeholder="Search by hero or map"
            value={this.state.filter.term}
            onChange={this.filterReplays} />
        </div>
        <ReplayList replays={filteredReplays} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplaysPage);
