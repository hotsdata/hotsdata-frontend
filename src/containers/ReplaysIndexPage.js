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
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentWillMount() {
    this.props.fetchReplays();
  }

  filterReplays(e) {
    let newFilter = {
      term: this.refs.term.value
    }
    this.setState({...this.state, filter: newFilter})
  }

  winRate(filteredReplays) {
    let wins = _.filter(filteredReplays, (replay) => replay.matchresult === "Victory").length
    let losses = _.filter(filteredReplays, (replay) => replay.matchresult === "Defeat").length

    return {
      wins: wins,
      losses: losses,
      winRate: Math.round((wins / (wins+losses)) * 100)
    }
  }

  clearSearch() {
    this.setState({...this.state, filter: {term: ''}});
  }

  render() {

    let filter = this.state.filter;

    let filteredReplays = this.props.replays.filter((replay) => {
      return filter.term === '' ||
             _.includes(replay.heroname.toLowerCase(), filter.term.toLowerCase()) ||
             _.includes(replay.mapname.toLowerCase(), filter.term.toLowerCase())
    });

    let winRates = this.winRate(filteredReplays);

    return (
      <div>
        <h2>
          Showing
          <span className="muted"> {filteredReplays.length} </span>
          Replays
        </h2>
        <h3 className="win-rate">
          {winRates.wins}-{winRates.losses} - {winRates.winRate} % Win Rate
        </h3>
        <div className="replay-filters">
          <input
            type="text"
            size="50"
            ref="term"
            placeholder="Search by hero or map"
            value={this.state.filter.term}
            onChange={this.filterReplays} />
          <button onClick={this.clearSearch}>Clear</button>
        </div>
        <ReplayList replays={filteredReplays} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    replays: state.replays.allReplays
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchReplays: fetchReplays }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplaysPage);
