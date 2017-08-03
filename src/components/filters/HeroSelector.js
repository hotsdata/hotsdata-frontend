import React from 'react';
import axios from 'axios';
import Select from 'react-select-plus';

const HeroSelector = (props) => {
  let options;
  if (props.heroes.allHeroes) {
    options =  props.heroes.allHeroes.map(hero => {
      return { label: hero.hero_info.hero_name, value: hero.hero_info.hero_name }
    });
  }

  return (
    <Select
      className="wide-field"
      name="hero"
      value={props.selected}
      options={options}
      onChange={props.onHeroSelected}
    />
  )
}

export default HeroSelector;
