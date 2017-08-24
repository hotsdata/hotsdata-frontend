import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Select from 'react-select-plus';

const HeroSelector = (props) => {
  let options;
  if (props.heroes) {
    let heroes = _.sortBy(props.heroes, ['name']);
    options = heroes.map(hero => {
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
