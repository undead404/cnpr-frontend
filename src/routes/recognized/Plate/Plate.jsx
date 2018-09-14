import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import style from './Plate.css';

@withStyles(style)
export default class Plate {
  render() {
    return (
      <span
        className={cx(
          style.root,
          this.props.isInWhiteList ? style.whiteListed : undefined,
        )}
      >
        {this.props.number}
      </span>
    );
  }
  static propTypes = {
    isInWhiteList: PropTypes.bool.isRequired,
    number: PropTypes.string.isRequired,
  };
}
