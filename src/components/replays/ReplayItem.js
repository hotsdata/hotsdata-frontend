import React from 'react';
import { Link } from 'react-router';
import { Table } from 'semantic-ui-react';

const ReplayItem = ({replay}) => {
  return (
    <Table.Row>
      <Table.Cell>Hero Here</Table.Cell>
      <Table.Cell>{replay.mapname}</Table.Cell>
      <Table.Cell>{replay.played_at}</Table.Cell>
      <Table.Cell><Link to={`/replays/${replay.replayid}`}>View</Link> </Table.Cell>
    </Table.Row>
  )
}

export default ReplayItem;
