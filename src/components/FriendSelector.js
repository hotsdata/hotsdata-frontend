import React from 'react';
import Select from 'react-select-plus';

const FriendSelector = (props) => {
  let options;
  if (props.friends.allFriends.length > 0) {
    options = props.friends.allFriends.map(friend => {
      return {
        label: `${friend.name} (${friend.games})`,
        value: friend.toonhandle
      }
    })
  }

  return (
    <Select
      className="wide-field"
      name="friend"
      placeholder="Select a friend"
      value={props.selected}
      options={options}
      onChange={props.onFriendSelected}
      isLoading={props.friends.isLoading} />
  )
}

export default FriendSelector;
