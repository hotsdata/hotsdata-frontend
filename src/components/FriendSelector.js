import React from 'react';
import Select from 'react-select-plus';

const FriendSelector = (props) => {
  let options;
  if (props.friends.lengh > 0) {
    options = props.friends.map(friend => {
      return {
        label: `${friend.teammate} (${})`,
        value: friend.toonhandle
      }
    })
  }

  return (
    <Select
      className="wide-field"
      name="friend"
      value={props.selected}
      options={options}
      onChange={props.onFriendSelected} />
  )
}

export default FriendSelector;
