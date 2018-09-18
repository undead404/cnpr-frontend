import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { areEntitiesArraysEqual } from 'functions';
import Log from './Log';
import style from './Logs.css';

@withStyles(style)
export default class LogScreen extends React.Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
    logs: PropTypes.arrayOf(
      PropTypes.shape({
        approved: PropTypes.bool,
        confidence: PropTypes.number,
        datetime: PropTypes.string,
        id: PropTypes.number,
        plate: PropTypes.string,
        region: PropTypes.string,
      }),
    ),
  };
  static defaultProps = {
    logs: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      logs: props.logs,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.actualize, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  actualize = async () => {
    const resp = await this.props.fetch('/graphql', {
      body: JSON.stringify({
        query: '{logs{allowed,confidence,datetime,id,plateNumber,region}}',
      }),
    });
    const { data } = await resp.json();
    if (!data || !data.logs) {
      this.setState({ error: 'Failed to load the logs.' });
    } else if (!areEntitiesArraysEqual(this.state.logs, data.logs)) {
      console.info(data);
      this.setState({
        logs: data.logs,
      });
    }
  };
  render() {
    return (
      <div className={style.root}>
        {this.state.error && (
          <div className={style.error}>{this.state.error}</div>
        )}
        <div className={style.head}>
          <div className={style.headContainer}>
            <span className={style.headCell}>Time</span>
            <span className={style.headCell}>License plate</span>
            <span className={style.headCell}>Country</span>
            <span className={style.headCell}>Confidence</span>
            <span className={style.headCell}>Access</span>
          </div>
        </div>
        {this.state.logs.length > 0 ? (
          this.state.logs.map(log => (
            <Log
              key={log.id}
              dateTime={log.datetime}
              plateNumber={log.plateNumber}
              region={log.region}
              approved={log.allowed}
              confidence={log.confidence}
            />
          ))
        ) : (
          <p className={style.emptyLogsMsg}>Empty log history</p>
        )}
      </div>
    );
  }
}
