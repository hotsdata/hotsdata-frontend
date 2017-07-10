import React from 'react';
import Select from 'react-select-plus';

const HeroSelector = (props) => {

  let heroOptions = [
    { label: "All", value: null, clearableValue: false},
    { label: "Warriors", options: [
        { label: "Anub'arak", value: "Anubarak" },
      ]},
    { label: "Assassins", options: [
      { label: "Kerrigan", value: "Kerrigan" },
      { label: "Malthael", value: "Malthael" },
    ]},
  ]

  return (
    <Select
      className="wide-field"
      name="hero"
      value={props.selected}
      options={heroOptions}
      onChange={props.onHeroSelected}
    />
  )
}

export default HeroSelector;
