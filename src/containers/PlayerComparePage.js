import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import Spinner from 'react-spinkit';

import { addPlayerCompare } from '../actions/PlayerCompareActions';
import StandardFilter from '../components/filters/StandardFilter';
import PlayerCompareTable from '../components/PlayerCompareTable';
import './PlayerComparePage.scss';

const imgUrl = "http://media.blizzard.com/heroes/malthael/bust.jpg";

class PlayerComparePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: '',
      filter: {
        selectedHero: "Greymane"
      }
    }

    this.onPlayerIdChanged = this.onPlayerIdChanged.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.filterChanged = this.filterChanged.bind(this);

    this.props.addPlayerCompare(6755);
    this.props.addPlayerCompare(6796);
    this.props.addPlayerCompare(12384);
    this.props.addPlayerCompare(543);
    this.props.addPlayerCompare(10732);
  }

  componentWillUpdate() {
    // console.log('props', this.props);
  }

  onPlayerIdChanged(e) {
    this.setState({playerId: e.target.value});
  }

  addPlayer() {
    this.props.addPlayerCompare(this.state.playerId);
  }

  filterChanged(filter) {
    this.setState({filter: filter});
  }

  render() {
    return (
      <div className="player-compare-page">
        <div className="top">
          <div className="hero">
            <h2>Malthael</h2>
            <img src={imgUrl} />
          </div>
          <div className="controls">
            <StandardFilter onChange={this.filterChanged} />
            <div className="add-player">
              <input type="text" name="addPlayer" value={this.state.playerId} onChange={this.onPlayerIdChanged} />
              <button onClick={this.addPlayer}>+ Player</button>
              <ToggleDisplay show={this.props.isLoading}>
                <Spinner name="three-bounce" color="orange" />
              </ToggleDisplay>
            </div>
          </div>
        </div>
        <div className="tabs">
          Tabs
        </div>
        <div>
          <PlayerCompareTable players={this.props.players} hero={this.state.filter.selectedHero} />
          <pre>{this.props.playerIds.toString()}</pre>
        </div>
        <pre>
          Marod = 6755
          <br/>
          MasterFish = 6796
          <br/>
          zombiechris = 12384
          <br/>
          Arik = 543
          <br/>
          teh24thson = 10732
        </pre>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    playerIds: state.playerCompare.playerIds,
    players: state.playerCompare.players,
    error: state.playerCompare.error,
    isLoading: state.playerCompare.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addPlayerCompare}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerComparePage);
