import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import style from './Log.css';

@withStyles(style)
export default class Log extends React.Component {
  static propTypes = {
    approved: PropTypes.bool,
    confidence: PropTypes.number,
    dateTime: PropTypes.string,
    plateNumber: PropTypes.string,
    region: PropTypes.string,
  };
  static defaultProps = {
    approved: undefined,
    confidence: undefined,
    dateTime: undefined,
    plateNumber: undefined,
    region: undefined,
  };
  render() {
    return (
      <div className={style.root}>
        <div
          className={cx(
            style.container,
            this.props.approved ? style.isApproved : undefined,
          )}
        >
          <span className={style.cell}>
            {this.props.dateTime || 'TimeStamp'}
          </span>
          <span className={style.cell}>
            {this.props.plateNumber || 'License plate'}
          </span>
          <span className={style.cell}>{this.props.region || 'Country'}</span>
          <span className={style.cell}>
            {this.props.confidence !== undefined
              ? this.props.confidence.toFixed(2)
              : 'Confidence'}
          </span>
          <span className={style.cell}>
            {(this.props.plateNumber &&
              ((this.props.approved && 'ALLOWED') || 'NOT ALLOWED')) ||
              'Access'}
          </span>
        </div>
      </div>
    );
  }
}
