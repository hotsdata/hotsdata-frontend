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
        term: '',
        matchType: 'All'
      }
    }

    this.changeSearchTerm = this.changeSearchTerm.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeMatchType = this.changeMatchType.bind(this);
    this.filterReplays = this.filterReplays.bind(this);

    this.props.fetchReplays();
  }

  componentWillMount() {
  }

  changeSearchTerm(e) {
    let newFilter = {...this.state.filter, term: this.refs.term.value};
    this.setState({...this.state, filter: newFilter});
  }

  clearSearch() {
    this.setState({...this.state, filter: {term: ''}});
  }

  changePage(e) {
    let endpoint = this.props.pages[e.target.id];
    this.props.fetchReplays(endpoint);
  }

  changeMatchType(e) {
    let newFilter = {...this.state.filter, matchType: e.target.value};
    this.setState({...this.state, filter: newFilter});
  }

  filterReplays() {
    let filter = this.state.filter;

    let filteredReplays = this.props.replays.filter((replay) => {
      return filter.term === '' ||
             _.startsWith(replay.heroname.toLowerCase(), filter.term.toLowerCase()) ||
             _.startsWith(replay.mapname.toLowerCase(), filter.term.toLowerCase())
    });

    if (filter.matchType != 'All') {
      filteredReplays = filteredReplays.filter(replay => {
        return replay.gametype == filter.matchType;
      });
    }

    return filteredReplays;
  }

  render() {
    let filteredReplays = this.filterReplays();

    return (
      <div className="replay-index">
        <h2 className="error" style={{backgroundColor: 'white', borderRadius: '4px', padding: '8px'}}>
          Due to extremely high volume, replays are taking extra time to process.  Thanks for being patient while we catch up on the backlog.
        </h2>
        <h2>
          Showing
          <span className="muted"> {filteredReplays.length} </span>
          Replays
        </h2>
        <div className="replay-body-wrapper">
          <div className="replay-wrapper">
            <div className="replay-filters">
              <input
                type="text"
                size="50"
                ref="term"
                placeholder="Search by hero or map"
                value={this.state.filter.term}
                onChange={this.changeSearchTerm} />
              <button className="btn" onClick={this.clearSearch}>Clear</button>
              <br />
              <div className="form-group">
                <label>Match Type</label>
                <select className="hd-select" onChange={this.changeMatchType} defaultValue="All">
                  <option value="All">All</option>
                  <option value="QuickMatch">Quick Match</option>
                  <option value="Unranked">Unranked</option>
                  <option value="Hero League">Hero League</option>
                  <option value="Team League">Team league</option>
                </select>
              </div>
              <div className="prev-next-buttons" style={{display: (filteredReplays.length > 0 ? 'inline' : 'none')}}>
                <button id="prev"
                  onClick={this.changePage}
                  style={{display: (this.props.pages.prev ? 'inherit' : 'none')}}
                  >Prev</button>
                <button id="next" onClick={this.changePage}>Next</button>
              </div>
            </div>
            <RecentWinRates replays={filteredReplays} />
          </div>
          <ReplayList replays={filteredReplays} />
          <div className="prev-next-buttons" style={{display: (filteredReplays.length > 0 ? 'inline' : 'none')}}>
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
