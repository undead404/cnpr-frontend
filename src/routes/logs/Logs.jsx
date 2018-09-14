import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Log from './Log';
import style from './Logs.css';

@withStyles(style)
export default class LogScreen extends React.Component {
  static propTypes = {
    logs: PropTypes.arrayOf(
      PropTypes.shape({
        approved: PropTypes.bool,
        confidence: PropTypes.number,
        dateTime: PropTypes.string,
        id: PropTypes.number,
        plate: PropTypes.string,
        region: PropTypes.string,
      }),
    ),
  };
  static defaultProps = {
    logs: [],
  };
  state = {};

  render() {
    return (
      <div className={style.root}>
        {this.props.logs.length > 0 ? (
          this.props.logs.map(log => (
            <Log
              key={log.id}
              dateTime={log.dateTime}
              plate={log.plate}
              region={log.region}
              approved={log.isAllowed}
              confidence={log.confidence}
              id={log.id}
            />
          ))
        ) : (
          <p className={style.emptyLogsMsg}>Empty log history</p>
        )}
      </div>
    );
  }
}
