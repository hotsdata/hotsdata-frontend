import React from 'react';
import Select from 'react-select-plus';

const MatchTypeSelector = (props) => {

  let matchTypeOptions = [
    { label: "All", value: null, clearableValue: false},
    { label: "Quick Match", value: "quickmatch" },
    { label: "Hero League", value: "heroleague" },
    { label: "Unranked", value: "unranked" },
    { label: "Team League", value: "teamleague" },
    { label: "Custom", value: "custom" },
  ]

  return (
    <Select
      className="wide-field"
      name="map"
      value={props.selected}
      options={matchTypeOptions}
      onChange={props.onMatchTypeSelected}
    />
  )
}

export default MatchTypeSelector;
