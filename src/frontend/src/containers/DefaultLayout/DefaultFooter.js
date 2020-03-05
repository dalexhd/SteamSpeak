import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://coreui.io">SteamSpeak</a></span>
        <span className="ml-auto">Developed with <span className="text-danger"><i className="fa fa-heart fa-lg"></i></span> by <a href="https://github.com/dalexhd" rel="noopener noreferrer" target="_blank">DalexHD</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
