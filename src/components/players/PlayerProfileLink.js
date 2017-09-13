import React from 'react';
import { Link } from 'react-router';

const PlayerProfileLink = (props) => {
  return (
    <Link
      className="player-profile-link"
      to={`/profile/${props.toonhandle}`} >
        {props.name}
    </Link>

  )
}

export default PlayerProfileLink;
