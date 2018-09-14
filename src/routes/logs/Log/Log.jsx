import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import style from './Log.css';

@withStyles(style)
export default class Log {
  static propTypes = {
    dateTime: PropTypes.string,
    plate: PropTypes.string,
    confidence: PropTypes.number,
    approved: PropTypes.bool,
    region: PropTypes.string,
    id: PropTypes.number,
  };
  static defaultProps = {
    approved: undefined,
    confidence: undefined,
    dateTime: undefined,
    id: undefined,
    plate: undefined,
    region: undefined,
  };
  render() {
    return (
      <div className={style.root}>
        <div
          className={cx(
            style.container,
            this.props.plate ? style.hasPlate : undefined,
            this.props.approved ? style.isApproved : undefined,
          )}
        >
          <span className={style.cell}>
            {this.props.dateTime || 'TimeStamp'}
          </span>
          <span className={style.cell}>
            {this.props.plate || 'License plate'}
          </span>
          <span className={style.cell}>{this.props.region || 'Country'}</span>
          <span className={style.cell}>
            {this.props.confidence
              ? this.props.confidence.toFixed(2)
              : 'Confidence'}
          </span>
          <span className={style.cell}>
            {(this.props.plate &&
              ((this.props.approved && 'ALLOWED') || 'NOT ALLOWED')) ||
              'Access'}
          </span>
        </div>
      </div>
    );
  }
}
