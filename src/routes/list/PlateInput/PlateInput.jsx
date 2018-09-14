import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import style from './PlateInput.css';

@withStyles(style)
export default class PlateInput extends React.Component {
  static propTypes = {
    onInput: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    warning: PropTypes.bool.isRequired,
  };
  render() {
    return (
      <div className={style.root}>
        <input
          className={cx(
            style.input,
            this.props.warning ? style.warned : undefined,
          )}
          type="text"
          onChange={this.props.onInput}
          placeholder="License plate"
          value={this.props.value}
        />
        <button
          className={style.button}
          onClick={this.props.onSubmit}
          disabled={this.props.warning}
        >
          Add to list
        </button>
      </div>
    );
  }
}
