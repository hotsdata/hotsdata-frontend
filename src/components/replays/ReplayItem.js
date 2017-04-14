import React from 'react';
import { Link } from 'react-router';

const ReplayItem = ({replay}) => {
  return (
    <tr>
      <td>{replay.mapname}</td>
      <td>{replay.played_at}</td>
      <td><Link to={`/replays/${replay.replayid}`}>View</Link> </td>
    </tr>
  )
}

export default ReplayItem;
