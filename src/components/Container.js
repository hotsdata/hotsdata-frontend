import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Footer from './Footer';

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="container content">
          <div className="errors" style={{display: (this.props.error === "" ? 'none' : 'inherit')}}>
            <span>{this.props.error}</span>
          </div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.error,
    user: state.user
  }
}

export default connect(mapStateToProps)(MainContainer);
