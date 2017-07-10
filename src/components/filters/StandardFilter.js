import React from 'react';

import HeroSelector from './HeroSelector';
import TimeFrameSelector from './TimeFrameSelector';
import MapSelector from './MapSelector';
import MatchTypeSelector from './MatchTypeSelector';
import './StandardFilter.scss';

class StandardFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedHero: null,
      selectedTimeFrame: null,
      selectedMap: null,
      selectedMatchType: null
    }

    this.onHeroSelected = this.onHeroSelected.bind(this);
    this.onTimeFrameSelected = this.onTimeFrameSelected.bind(this);
    this.onMapSelected = this.onMapSelected.bind(this);
    this.onMatchTypeSelected = this.onMatchTypeSelected.bind(this);
  }

  onHeroSelected(val) {
    console.log('onHeroSelected', val);
    this.setState({selectedHero: val})
  }

  onTimeFrameSelected(val) {
    console.log('onTimeFrameSelected', val);
    this.setState({selectedTimeFrame: val});
  }

  onMapSelected(val) {
    this.setState({selectedMap: val.value});
  }

  onMatchTypeSelected(val) {
    this.setState({selectedMatchType: val.value});
  }

  render() {
    return (
      <div className="standard-filter">
        <div className="row">
          <div className="control-group">
            <label>Hero: </label>
            <HeroSelector
              onHeroSelected={this.onHeroSelected}
              selected={this.state.selectedHero} />
          </div>
          <div className="control-group">
            <label>Time Frame: </label>
            <TimeFrameSelector
              onTimeFrameSelected={this.onTimeFrameSelected}
              selected={this.state.selectedTimeFrame} />
          </div>
        </div>
        <div className="row">
          <div className="control-group">
            <label>Map: </label>
            <MapSelector
              onMapSelected={this.onMapSelected}
              selected={this.state.selectedMap} />
          </div>
          <div className="control-group">
            <label>Match Type: </label>
            <MatchTypeSelector
              onMatchTypeSelected={this.onMatchTypeSelected}
              selected={this.state.selectedMatchType} />
          </div>
        </div>
      </div>
    )
  }
}

export default StandardFilter;
