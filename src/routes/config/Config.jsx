import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Config.css';
@withStyles(style)
export default class Config extends React.Component {
  static propTypes = {
    config: PropTypes.shape({
      configVersion: PropTypes.string,
      minConfidence: PropTypes.number,
      minNumberLength: PropTypes.number,
      recognitionDelay: PropTypes.number,
    }).isRequired,
    fetch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.config,
    };
  }

  onChange = ({ target }) => {
    console.info(target.name, target.value);
    const value = parseInt(target.value, 10);
    this.setState({ [target.name]: value < 0 ? 0 : value }, () => {
      console.info(this.state);
    });
  };

  triggerChangeAndSave = async type => {
    console.info('state', this.state);
    if (this.state[type]) {
      const response = await this.props.fetch('/graphql', {
        body: JSON.stringify({
          query:
            'mutation editConfig($minConfidence: Float!, $minNumberLength: Int!, $recognitionDelay: Int!){editConfig(minConfidence: $minConfidence, minNumberLength: $minNumberLength, recognitionDelay: $recognitionDelay){minConfidence,minNumberLength,recognitionDelay}}',
          variables: {
            ...this.state,
          },
        }),
      });
      const data = await response.json();
      console.info(data);
      if (data && data.editConfig) {
        this.setState(data.editConfig);
      }
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
          <div className={style.label}> Minimal confidence: </div>
          {!this.state.editConfidence ? (
            <div className={style.label}> {this.state.minConfidence} %</div>
          ) : (
            <input
              className={style.input}
              name="minConfidence"
              onChange={this.onChange}
              type="number"
              value={this.state.minConfidence}
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
            <div className={style.label}> {this.state.recognitionDelay} ms</div>
          ) : (
            <input
              className={style.input}
              name="delay"
              onChange={this.onChange}
              placeholder="Delay"
              type="number"
              value={this.state.recognitionDelay}
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
