import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';

class ReplayNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: 'stats'
    }

    this.handleItemClick = this.handleItemClick.bind(this);
  }


  handleItemClick(e, {name}) {
    this.setState({activeItem: name });
    this.props.onItemClick(name);
  }

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name="stats" active={this.state.activeItem === 'stats'} onClick={this.handleItemClick} />
          <Menu.Item name="talents" active={this.state.activeItem === 'talents'} onClick={this.handleItemClick} />
        </Menu>
      </div>
    )
  }
}

export default ReplayNav;
