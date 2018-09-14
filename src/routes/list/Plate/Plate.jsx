import PropTypes from 'prop-types';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Plate.css';
import deleteIcon from './delete.svg';

@withStyles(style)
export default class Plate extends React.Component {
  static propTypes = {
    allowed: PropTypes.bool.isRequired,
    fetch: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    last_seen: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onStatusChange: PropTypes.func.isRequired,
  };
  state = {
    deleted: false,
  };

  delete = async () => {
    await this.props.fetch('/graphql', {
      body: JSON.stringify({
        query: 'mutation deletePlate($id: Int!){deletePlate(id: $id){id}}',
        variables: {
          id: this.props.id,
        },
      }),
    });
    this.setState({ deleted: true });
  };

  render() {
    return (
      <div className={style.root} hidden={this.state.deleted}>
        <p className={style.id}>{`ID: ${this.props.id}.`}</p>
        <p className={style.number}>{` ${this.props.number}`}</p>
        <p className={style.statusInput}>
          <input
            type="checkbox"
            checked={this.props.allowed}
            onChange={this.props.onStatusChange}
          />
        </p>
        <p className={style.lastSeen}>{this.props.last_seen || 'Never'}</p>
        <button className={style.deleteButton} onClick={this.delete}>
          <img alt="Delete" className={style.deleteIcon} src={deleteIcon} />
        </button>
      </div>
    );
  }
}
