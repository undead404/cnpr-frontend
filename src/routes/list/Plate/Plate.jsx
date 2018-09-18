import PropTypes from 'prop-types';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Plate.css';
import deleteIcon from './delete.svg';

@withStyles(style)
export default class Plate extends React.Component {
  static propTypes = {
    allowed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    last_seen: PropTypes.string,
    number: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSetAllowedness: PropTypes.func.isRequired,
  };
  static defaultProps = {
    last_seen: undefined,
  };
  state = {};

  render() {
    return (
      <div className={style.root}>
        <p className={style.id}>{`ID: ${this.props.id}.`}</p>
        <p className={style.number}>{` ${this.props.number}`}</p>
        <p className={style.statusInput}>
          <input
            type="checkbox"
            checked={this.props.allowed}
            onChange={event =>
              this.props.onSetAllowedness(this.props.id, event.target.checked)
            }
          />
        </p>
        <p className={style.lastSeen}>{this.props.last_seen || 'Never'}</p>
        <button
          className={style.deleteButton}
          onClick={() => this.props.onDelete(this.props.id)}
        >
          <img alt="Delete" className={style.deleteIcon} src={deleteIcon} />
        </button>
      </div>
    );
  }
}
