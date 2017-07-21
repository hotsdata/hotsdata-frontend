import React from 'react';
import axios from 'axios';
import Select from 'react-select-plus';

function getOptions() {
  return axios.get('https://api.hotslogs.com/Public/Data/Heroes')
    .then((response) => {
      let heroData = response.data.map((hero) => {
        return { label: hero.PrimaryName, value: hero.PrimaryName }
      })

      return heroData;
    })
    .then((data) => {
      return data;
    })
}

const HeroSelector = (props) => {

  // let heroOptions = [
  //   { label: "All", value: null, clearableValue: false},
  //   { label: "Warriors", options: [
  //       { label: "Anub'arak", value: "Anubarak" },
  //     ]},
  //   { label: "Assassins", options: [
  //     { label: "Kerrigan", value: "Kerrigan" },
  //     { label: "Malthael", value: "Malthael" },
  //   ]},
  // ]

  let heroOptions = getOptions();

  return (
    <Select.Async
      className="wide-field"
      name="hero"
      value={props.selected}
      loadOptions={getOptions}
      onChange={props.onHeroSelected}
    />
  )
}

export default HeroSelector;
