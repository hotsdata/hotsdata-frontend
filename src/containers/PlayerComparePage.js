import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addPlayerCompare } from '../actions/PlayerCompareActions';
import StandardFilter from '../components/filters/StandardFilter';
import PlayerCompareTable from '../components/PlayerCompareTable';
import './PlayerComparePage.scss';

const imgUrl = "http://media.blizzard.com/heroes/malthael/bust.jpg";

class PlayerComparePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: '6755'
    }

    this.onPlayerIdChanged = this.onPlayerIdChanged.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
  }

  onPlayerIdChanged(e) {
    this.setState({playerId: e.target.value});
  }

  addPlayer() {
    this.props.addPlayerCompare(this.state.playerId);
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
            <StandardFilter />
            <div className="add-player">
              <input type="text" name="addPlayer" value={this.state.playerId} onChange={this.onPlayerIdChanged} />
              <button onClick={this.addPlayer}>+ Player</button>
            </div>
          </div>
        </div>
        <div className="tabs">
          Tabs
        </div>
        <div>
          <PlayerCompareTable players={this.props.players} />
          <pre>{this.props.playerIds.toString()}</pre>
        </div>
        <pre>
          Marod = 6755
          MasterFish = 6796
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
