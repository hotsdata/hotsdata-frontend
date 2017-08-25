import React from 'react';
import Select from 'react-select-plus';

const MapSelector = (props) => {

  let mapOptions = [
    { label: "All", value: null, clearableValue: false},
    { label: "Blackheart's Bay", value: "blackhearts" }
  ]

  return (
    <Select
      className="wide-field"
      name="map"
      value={props.selected}
      options={mapOptions}
      onChange={props.onMapSelected}
    />
  )
}

export default MapSelector;
