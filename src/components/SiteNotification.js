import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SiteNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };

    this.handleClose = this.handleClose.bind(this);
  }

  // If the user closes the notification
  handleClose(e) {
    e.preventDefault();
    this.setState({
      isOpen: false
    });
  }

  render() {
    const { message } = this.props;
    const { isOpen } = this.state;

    if (isOpen) {
      return (
        // If user clicks anywhere on notification, close it
        <div className="site-notification" onClick={this.handleClose}>
          <p className="message">{ message }</p>
          <button className="close-button">
            <i className="fa fa-times" />
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

SiteNotification.propTypes = {
  message: PropTypes.string
};

export default SiteNotification;
