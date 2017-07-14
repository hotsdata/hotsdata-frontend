import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select-plus';
import { Table, Thead, Th } from 'reactable';

import { fetchHeroes } from '../actions/HeroActions';
import { fetchMaps } from '../actions/MapActions';
import { fetchGlobalHeroWinrates } from '../actions/GlobalStatsActions';
import RoleIcon from '../components/icons/RoleIcon';
import './GlobalHeroesPage.scss';

const patchList = [
  { label: "Malthael Patch", value: "Malthael" },
  { label: "D.Va Patch", value: "D.Va" },
  { label: "Genji Patch", value: "Genji" },
  { label: "Cassia Patch", value: "Cassia" },
  { label: "Probius Patch", value: "Probius" }
]

const matchTypeList = [
  { label: "All", value: "All" },
  { label: "Hero League", value: "Hero League"},
  { label: "Quick Match", value: "QuickMatch"},
  { label: "Unranked", value: "Unranked"},
  { label: "Team League", value: "Team League"}
]

class GlobalHeroesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPatch: 'Malthael',
      selectedMatchType: 'Hero League',
      selectedRoles: ["Warrior", "Assassin", "Support", "Specialist"],
      selectedMap: 'All'
    }

    this.onChangePatch = this.onChangePatch.bind(this);
    this.onChangeMatchType = this.onChangeMatchType.bind(this);
    this.onChangeMap = this.onChangeMap.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  componentWillMount() {
    this.props.fetchHeroes();
    this.props.fetchMaps();
    this.props.fetchGlobalHeroWinrates();
  }

  onChangePatch(val) {
    this.setState({selectedPatch: val});
  }

  onChangeMatchType(val) {
    this.setState({selectedMatchType: val});
  }

  onChangeMap(val) {
    this.setState({selectedMap: val});
  }

  render() {
    if (!this.props.maps.length > 0 || !this.props.heroes.length > 0) { return (<div>Loading...</div>)}

    let filteredData = this.filterData(this.props.globalHeroWinrates);

    let mapList = this.props.maps.map(map => {
      return {label: map.PrimaryName, value: map.PrimaryName}
    });

    return (
      <div>
        <h1>Global Hero Win Rates</h1>
        <div className="filters">
          <div className="filter-row">
            <div className="wide-field">
              <Select name="patch" value={this.state.selectedPatch} options={patchList} onChange={this.onChangePatch} />
            </div>
            <div className="role-select">
              <RoleIcon
                className={_.includes(this.state.selectedRoles, "Warrior") ? "selected" : ""}
                role="warrior"
                onClick={(name) => this.onRoleChange(name)} />
              <RoleIcon
                className={_.includes(this.state.selectedRoles, "Assassin") ? "selected" : ""}
                role="assassin"
                onClick={(name) => this.onRoleChange(name)} />
              <RoleIcon
                className={_.includes(this.state.selectedRoles, "Support") ? "selected" : ""}
                role="support"
                onClick={(name) => this.onRoleChange(name)} />
              <RoleIcon
                className={_.includes(this.state.selectedRoles, "Specialist") ? "selected" : ""}
                role="specialist"
                onClick={(name) => this.onRoleChange(name)} />
            </div>
          </div>
          <div className="filter-row">
            <div className="wide-field">
              <Select name="matchType" value={this.state.selectedMatchType} options={matchTypeList} onChange={this.onChangeMatchType} />
            </div>
            <div className="wide-field">
              <Select name="map" value={this.state.selectedMap} options={mapList} onChange={this.onChangeMap} />
            </div>
          </div>
        </div>
        <div className="win-rates">
          <Table className="table table-striped" data={filteredData} sortable={true}>
            <Thead>
              <Th column="hero">Hero</Th>
              <Th column="winRate">Win Rate</Th>
              <Th column="change">Change</Th>
              <Th column="gamesPlayed">Games Played</Th>
              <Th column="gamesBanned">Games Banned</Th>
              <Th column="popularity">Popularity</Th>
            </Thead>
          </Table>
        </div>
      </div>
    )
  }

  onRoleChange(role) {
    let prevState = this.state.selectedRoles;
    if (_.includes(this.state.selectedRoles, role)) {
      _.remove(prevState, (r) => r == role)
      this.setState({selectedRoles: prevState});
    } else {
      this.setState({selectedRoles: _.union(prevState, [role])});
    }
  }

  filterData(data) {
    return _.filter(data, (row) => {
      return _.includes(this.state.selectedRoles, row.role);
    });
  }
}

function mapStateToProps(state) {
  return {
    heroes: state.heroes.allHeroes,
    maps: state.maps.allMaps,
    globalHeroWinrates: state.global.heroWinrates
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchHeroes, fetchMaps, fetchGlobalHeroWinrates}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeroesPage);
