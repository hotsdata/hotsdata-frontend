import React from 'react';
import axios from 'axios';
import Select from 'react-select-plus';

const HeroSelector = (props) => {
  let options;
  if (props.heroes) {
    options =  props.heroes.map(hero => {
      return { label: hero.name, value: hero.name }
    });
  }

  return (
    <Select
      className="wide-field"
      name="hero"
      value={props.selected}
      options={options}
      onChange={props.onHeroSelected}
      isLoading={props.isLoading}
    />
  )
}

export default HeroSelector;
