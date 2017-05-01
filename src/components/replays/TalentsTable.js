import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

class TalentsTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.talents == null) {
      return (<div>Loading Talents...</div>)
    }

    let talentRows = this.props.talents.map((playerTalents, i) => {
      let talentCells = playerTalents.talents.map((talent, j) => {
        return (
          <td key={j}>{talent.talent_name}</td>
        )
      });

      return (
        <tr key={i}>
          <td>Sonya</td>
          {talentCells}
        </tr>
      )
    });

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
        <tbody>
          {talentRows}
        </tbody>
      </Table>
    )
  }
}

export default TalentsTable;
