import React from 'react';
import Select from 'react-select-plus';

const TimeFrameSelector = (props) => {

  let timeOptions = [
    { label: "All Time", value: null},
    { label: "Patches", options: [
      { label: "Current", value: "current" },
      { label: "Malthael", value: "malthael" },
      { label: "D.Va", value: "dva" },
    ]},
    { label: "Season", options: [
      { label: "Current", value: "current" },
      { label: "2017 Season 1", value: "current" },
      { label: "2016 Season 3", value: "current" },
      { label: "2016 Season 2", value: "current" },
      { label: "2016 Season 1", value: "current" },
    ]},
    { label: "Last", options: [
      { label: "30 Days", value: "winrate_l30" },
      { label: "60 Days", value: "winrate_l60" },
      { label: "90 Days", value: "winrate_l90" },
      { label: "180 Days", value: "winrate_l180" }
    ]},
  ]

  return (
    <Select
      className="wide-field"
      name="timeFrame"
      value={props.selected}
      options={timeOptions}
      onChange={props.onTimeFrameSelected}
    />
  )
}

export default TimeFrameSelector;
