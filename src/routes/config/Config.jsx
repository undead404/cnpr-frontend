import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Config.css';
@withStyles(style)
export default class Config extends React.Component {
  static propTypes = {
    config: PropTypes.shape({
      confidence: PropTypes.number,
      delay: PropTypes.number,
      minNumberLength: PropTypes.number,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.config,
    };
  }

  onChange = ({ target }) => {
    this.setState({ [target.name]: target.value < 0 ? 0 : target.value });
  };

  triggerChangeAndSave = type => {
    if (this.state[type]) {
      this.props.onSave(this.state);
    }
    this.setState({ [type]: !this.state[type] });
  };

  render() {
    return (
      <div className={style.root}>
        <div className={style.row}>
          <div className={style.label}> Minimal license length: </div>
          {!this.state.editLength ? (
            <div className={style.label}> {this.state.minNumberLength} </div>
          ) : (
            <input
              className={style.input}
              id="minNumberLength"
              min={0}
              name="minNumberLength"
              onChange={this.onChange}
              placeholder="Min number length"
              type="number"
              value={this.state.minNumberLength}
            />
          )}

          <button
            className={style.trigger}
            onClick={() => this.triggerChangeAndSave('editLength')}
          >
            {this.state.editLength ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className={style.row}>
          <div className={style.label}> Minimal confidence : </div>
          {!this.state.editConfidence ? (
            <div className={style.label}> {this.state.confidence} %</div>
          ) : (
            <input
              className={style.input}
              name="confidence"
              onChange={this.onChange}
              placeholder="Confidence"
              type="number"
              value={this.state.confidence}
            />
          )}
          <button
            className={style.trigger}
            onClick={() => this.triggerChangeAndSave('editConfidence')}
          >
            {this.state.editConfidence ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className={style.row}>
          <div className={style.label}> Minimal delay : </div>
          {!this.state.editDelay ? (
            <div className={style.label}> {this.state.delay} ms</div>
          ) : (
            <input
              className={style.input}
              name="delay"
              onChange={this.onChange}
              placeholder="Delay"
              type="number"
              value={this.state.delay}
            />
          )}
          <button
            className={style.trigger}
            onClick={() => this.triggerChangeAndSave('editDelay')}
          >
            {this.state.editDelay ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    );
  }
}
