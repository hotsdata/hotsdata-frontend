import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Select } from 'react-select-plus';
import ToggleDisplay from 'react-toggle-display';
import Spinner from 'react-spinkit';

import { searchPlayers } from '../actions/PlayerSearchActions';
import './PlayerSearch.scss';

class PlayerSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    this.searchPlayers = _.debounce((term) => { this.props.searchPlayers(term)}, 300);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.onPlayerSelected = this.onPlayerSelected.bind(this);
  }

  render() {
    let options = this.createOptions();

    return (
      <div>
        <input
          className="wide-field"
          name="playerSearch"
          type="text"
          placeholder="Search Players"
          value={this.state.term}
          onChange={this.onSearchChange} />
        <ToggleDisplay show={this.props.playerSearch.isLoading}>
          <Spinner name="circle" color="orange" />
        </ToggleDisplay>
        <ToggleDisplay show={this.state.term.length > 2}>
          <div>{this.props.playerSearch.results.length} players found</div>
          <ul className="search-results wide-field">
            {options}
          </ul>
        </ToggleDisplay>
      </div>
    )
  }

  onSearchChange(e) {
    let term = e.target.value;
    this.setState({term: e.target.value}, () => {
      if(term.length > 2) {
        this.searchPlayers(term); // debounced version
      }
    });
  }

  onPlayerSelected(player) {
    this.props.onPlayerSelected(player);
    this.setState({term: ''});
  }

  createOptions() {
    return this.props.playerSearch.results.map(player => {
      return (
        <li
          key={player.player_id}
          value={player.toonhandle}
          onClick={() => this.onPlayerSelected(player)}>
          {player.name}
          <span>{player.region}</span>
        </li>
      )
    });
  }
}

function mapStateToProps(state) {
  return {
    playerSearch: state.playerSearch
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({searchPlayers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSearch);
