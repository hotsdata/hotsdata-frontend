import React, { Component } from 'react';
import {Table, Thead, Tbody, Th, Tr, Td} from 'reactable';

class ProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let data = [
      {hero: "Valla", winRate: 52.1},
      {hero: "Arthas", winRate: 48.7},
      {hero: "Kerrigan", winRate: 55.3},
      {hero: "Tyrande", winRate: 52.7}
    ];

    let tableRows = data.map((d) => {
      return (
        <Tr key={d.hero}>
          <Td column="hero">{d.hero}</Td>
          <Td column="winRate">{d.winRate}</Td>
        </Tr>
      )
    });

    let sortable = [
      {
        column: 'hero',
        sortFunction: (a, b) => {
          return a[0].localeCompare(b[0]);
        }
      },
      {
        column: 'winRate',
        sortFunction: (a, b) => {
          return a < b;
        }
      }
    ]

    return (
      <div className="profile-page">
        <div className="filters">
        </div>
        <div className="heroes-table">
          <Table className="table sortable striped" sortable={sortable}>
            <Thead>
              <Th column="hero">Hero</Th>
              <Th column="winRate">Win Rate</Th>
            </Thead>
            {tableRows}
          </Table>
        </div>
      </div>
    )
  }

}

export default ProfilePage;
