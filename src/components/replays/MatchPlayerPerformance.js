import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';

class MatchPlayerPerformance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '0'
    }

    this.handlePlayerClick = this.handlePlayerClick.bind(this);
  }

  handlePlayerClick(e, {name}) {
    this.setState({activeItem: name});
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={2}>
          <Menu fluid vertical tabular>
            <Menu.Item name='0' active={this.state.activeItem == '0'} onClick={this.handlePlayerClick}>Marod</Menu.Item>
            <Menu.Item name='1' active={this.state.activeItem == '1'} onClick={this.handlePlayerClick}>MasterFish</Menu.Item>
            <Menu.Item name='2' active={this.state.activeItem == '2'} onClick={this.handlePlayerClick}>Arik</Menu.Item>
            <Menu.Item name='3' active={this.state.activeItem == '3'} onClick={this.handlePlayerClick}>zombiechris</Menu.Item>
            <Menu.Item name='4' active={this.state.activeItem == '4'} onClick={this.handlePlayerClick}>seatchle</Menu.Item>
            <Menu.Item name='5' active={this.state.activeItem == '5'} onClick={this.handlePlayerClick}>KeepnItKappa</Menu.Item>
            <Menu.Item name='6' active={this.state.activeItem == '6'} onClick={this.handlePlayerClick}>Einjeru</Menu.Item>
            <Menu.Item name='7' active={this.state.activeItem == '7'} onClick={this.handlePlayerClick}>Flacker</Menu.Item>
            <Menu.Item name='8' active={this.state.activeItem == '8'} onClick={this.handlePlayerClick}>djsnj20</Menu.Item>
            <Menu.Item name='9' active={this.state.activeItem == '9'} onClick={this.handlePlayerClick}>elfenari</Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column width={14}>
          <div className="match-performance-header">
            Marod - Kerrigan
          </div>
        </Grid.Column>
      </Grid>
    );
  }

}

export default MatchPlayerPerformance;
