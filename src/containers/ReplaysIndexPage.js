import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchReplays } from '../actions/replay_actions';
import ReplayList from '../components/replays/ReplayList';
import RecentWinRates from '../components/replays/RecentWinRates';
import './ReplayIndexPage.scss';

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
    this.changePage = this.changePage.bind(this);

    this.props.fetchReplays();
  }

  componentWillMount() {
  }

  filterReplays(e) {
    let newFilter = {
      term: this.refs.term.value
    }
    this.setState({...this.state, filter: newFilter})
  }

  clearSearch() {
    this.setState({...this.state, filter: {term: ''}});
  }

  changePage(e) {
    let endpoint = this.props.pages[e.target.id];
    this.props.fetchReplays(endpoint);
  }

  render() {

    let filter = this.state.filter;

    let filteredReplays = this.props.replays.filter((replay) => {
      return filter.term === '' ||
             _.startsWith(replay.heroname.toLowerCase(), filter.term.toLowerCase()) ||
             _.startsWith(replay.mapname.toLowerCase(), filter.term.toLowerCase())
    });

    return (
      <div className="replay-index">
        <h2>
          Showing
          <span className="muted"> {filteredReplays.length} </span>
          Replays
        </h2>
        <div className="replay-body-wrapper" style={{display: (filteredReplays.length > 0 ? 'inherit' : 'none')}}>
          <div className="replay-wrapper">
            <div className="filters">
              <div className="replay-filters">
                <input
                  type="text"
                  size="50"
                  ref="term"
                  placeholder="Search by hero or map"
                  value={this.state.filter.term}
                  onChange={this.filterReplays} />
                <button className="btn" onClick={this.clearSearch}>Clear</button>
              </div>
            </div>
            <RecentWinRates replays={filteredReplays} />
          </div>
          <div className="prev-next-buttons">
            <button id="prev"
              onClick={this.changePage}
              style={{display: (this.props.pages.prev ? 'inherit' : 'none')}}
              >Prev</button>
            <button id="next" onClick={this.changePage}>Next</button>
          </div>
          <ReplayList replays={filteredReplays} />
          <div className="prev-next-buttons">
            <button id="prev"
              onClick={this.changePage}
              style={{display: (this.props.pages.prev ? 'inherit' : 'none')}}
              >Prev</button>
            <button id="next" onClick={this.changePage}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    replays: state.replays.allReplays,
    pages: state.replays.pages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchReplays: fetchReplays }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplaysPage);
