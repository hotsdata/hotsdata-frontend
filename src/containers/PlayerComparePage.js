import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import Spinner from 'react-spinkit';

import { fetchHeroes } from '../actions/HeroActions';
import { addPlayerCompare, removePlayerCompare } from '../actions/PlayerCompareActions';
import { playerSearchClearResults } from '../actions/PlayerSearchActions';
import { fetchFriends } from '../actions/FriendActions';
import { urlName } from '../lib/HeroHelpers';
import PlayerSearch from '../components/PlayerSearch';
import HeroSelector from '../components/filters/HeroSelector';
import FriendSelector from '../components/FriendSelector';
import StandardFilter from '../components/filters/StandardFilter';
import PlayerCompareTable from '../components/PlayerCompareTable';
import './PlayerComparePage.scss';

class PlayerComparePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlayer: '',
      filter: {
        selectedHero: 'Greymane'
      }
    }

    this.onPlayerSelected = this.onPlayerSelected.bind(this);
    this.onFriendSelected = this.onFriendSelected.bind(this);
    this.onHeroSelected = this.onHeroSelected.bind(this);
    this.addSelf = this.addSelf.bind(this);
    this.filterChanged = this.filterChanged.bind(this);

    this.props.fetchHeroes();
    this.props.fetchFriends();
  }

  onPlayerSelected(player) {
    this.props.addPlayerCompare(player);
    this.props.playerSearchClearResults();
  }

  onFriendSelected(friend) {
    let selectedFriend = _.find(this.props.friends.allFriends, (f) => f.toonhandle == friend.value)
    this.props.addPlayerCompare(selectedFriend);
  }

  onHeroSelected(val) {
    this.setState({filter: {selectedHero: val.label}});
  }

  addSelf() {
    this.props.addPlayerCompare(this.props.user);
  }

  filterChanged(filter) {
    this.setState({filter: filter});
  }

  render() {
    let imgName = urlName(this.state.filter.selectedHero);
    let imgUrl = `https://s3-us-west-2.amazonaws.com/hotsdata-assets/images/heroes/${imgName}_bust.jpg`

    return (
      <div className="player-compare-page">
        <div className="row">
          <div className="hero">
            <img src={imgUrl} />
            <h2>{this.state.filter.selectedHero}</h2>
          </div>
          <div className="controls">
            <div className="control-column">
              <div className="player-search">
                <PlayerSearch selectedPlayer={this.state.selectedPlayer} onPlayerSelected={this.onPlayerSelected} />
              </div>
              <FriendSelector
                friends={this.props.friends}
                onFriendSelected={this.onFriendSelected} />
              <button onClick={this.addSelf} style={{marginLeft: '-1px'}}>
                Add Yourself
              </button>
            </div>
            <div className="control-column">
              <HeroSelector
                heroes={this.props.heroes.allHeroes}
                onHeroSelected={this.onHeroSelected}
                selected={this.state.filter.selectedHero}
                isLoading={this.props.heroes.isLoading} />
            </div>
          </div>
        </div>
        <ToggleDisplay show={this.props.isLoading}>
          <Spinner name="line-scale" color="orange" />
        </ToggleDisplay>
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
    heroes: state.heroes,
    friends: state.friends,
    user: state.session.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addPlayerCompare, removePlayerCompare,
      fetchHeroes, playerSearchClearResults, fetchFriends },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerComparePage);
