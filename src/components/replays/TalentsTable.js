import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

class TalentsTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Hero</Table.HeaderCell>
            <Table.HeaderCell>1</Table.HeaderCell>
            <Table.HeaderCell>4</Table.HeaderCell>
            <Table.HeaderCell>7</Table.HeaderCell>
            <Table.HeaderCell>10</Table.HeaderCell>
            <Table.HeaderCell>13</Table.HeaderCell>
            <Table.HeaderCell>16</Table.HeaderCell>
            <Table.HeaderCell>20</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentReplay: state.replays.currentReplay
  }
}

export default connect(mapStateToProps)(TalentsTable);
