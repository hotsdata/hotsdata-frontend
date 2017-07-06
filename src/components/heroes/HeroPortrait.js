import React from 'react';

const baseUrl = "https://s3-us-west-2.amazonaws.com/openlogs-icons/storm_ui_ingame_heroselect_btn_";

const HeroPortrait = (props) => {
  let imgName = props.hero.toLowerCase() + ".png";

  return (
    <img src={`${baseUrl}${imgName}`} />
  )
}

export default HeroPortrait;
