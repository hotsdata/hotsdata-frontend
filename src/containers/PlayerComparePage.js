import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import Spinner from 'react-spinkit';

import { fetchHeroes } from '../actions/HeroActions';
import { addPlayerCompare } from '../actions/PlayerCompareActions';
import PlayerSearch from '../components/PlayerSearch';
import StandardFilter from '../components/filters/StandardFilter';
import PlayerCompareTable from '../components/PlayerCompareTable';
import './PlayerComparePage.scss';

const testData = {
  marod: "1-Hero-1-775282",
  masterfish: "1-Hero-1-1950034",
  zombiechris: "1-Hero-1-951239",
  sheep: "1-Hero-1-1371988",
  arik: "1-Hero-1-1516794"
}

class PlayerComparePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlayer: '',
      filter: {
        selectedHero: "Greymane"
      }
    }

    this.onPlayerSelected = this.onPlayerSelected.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.filterChanged = this.filterChanged.bind(this);

    this.props.fetchHeroes();

    // this.props.addPlayerCompare(testData.marod);
    // this.props.addPlayerCompare(testData.masterfish);
    // this.props.addPlayerCompare(testData.zombiechris);
    // this.props.addPlayerCompare(testData.arik);
    // this.props.addPlayerCompare(testData.sheep);
  }

  componentWillUpdate() {
    // console.log('props', this.props);
  }

  onPlayerSelected(player) {
    console.log('player selected', player);
    this.props.addPlayerCompare(player);
  }

  addPlayer() {
    this.props.addPlayerCompare(this.state.toonhandle);
  }

  filterChanged(filter) {
    this.setState({filter: filter});
  }

  render() {
    let imgUrl = `http://media.blizzard.com/heroes/${this.state.filter.selectedHero}/bust.jpg`;

    return (
      <div className="player-compare-page">
        <div className="row add-player">
          <PlayerSearch selectedPlayer={this.state.selectedPlayer} onPlayerSelected={this.onPlayerSelected} />
          <ToggleDisplay show={this.props.isLoading}>
            <Spinner name="three-bounce" color="orange" />
          </ToggleDisplay>
        </div>
        <div className="row">
          <div className="hero">
            <h2>{this.state.filter.selectedHero}</h2>
            <img src={imgUrl} />
          </div>
          <div className="controls">
            <StandardFilter onChange={this.filterChanged} heroes={this.props.heroes} />
          </div>
        </div>
        <div className="tabs">
          Tabs
        </div>
        <div>
          <PlayerCompareTable players={this.props.players} hero={this.state.filter.selectedHero} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    toonhandles: state.playerCompare.toonhandles,
    players: state.playerCompare.players,
    error: state.playerCompare.error,
    isLoading: state.playerCompare.isLoading,
    heroes: state.heroes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addPlayerCompare, fetchHeroes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerComparePage);
