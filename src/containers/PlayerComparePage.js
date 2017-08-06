import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import Spinner from 'react-spinkit';

import { fetchHeroes } from '../actions/HeroActions';
import { addPlayerCompare, removePlayerCompare } from '../actions/PlayerCompareActions';
import { playerSearchClearResults } from '../actions/PlayerSearchActions';
import PlayerSearch from '../components/PlayerSearch';
import HeroSelector from '../components/filters/HeroSelector';
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
    this.onHeroSelected = this.onHeroSelected.bind(this);
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
    this.props.playerSearchClearResults();
  }

  onHeroSelected(val) {
    this.setState({filter: {selectedHero: val.label}});
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
        <div className="row">
          <div className="hero">
            <img src={imgUrl} />
            <h2>{this.state.filter.selectedHero}</h2>
          </div>
          <div>
            <div>
              <HeroSelector
                heroes={this.props.heroes}
                onHeroSelected={this.onHeroSelected}
                selected={this.state.filter.selectedHero} />
            </div>
            <div className="add-player">
              <PlayerSearch selectedPlayer={this.state.selectedPlayer} onPlayerSelected={this.onPlayerSelected} />
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
          <PlayerCompareTable
            players={this.props.players}
            hero={this.state.filter.selectedHero}
            onRemovePlayer={this.props.removePlayerCompare} />
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
  return bindActionCreators(
    { addPlayerCompare, removePlayerCompare,
      fetchHeroes, playerSearchClearResults },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerComparePage);
