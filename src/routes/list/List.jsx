import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import style from './List.css';
import Plate from './Plate';
import PlateInput from './PlateInput';

@withStyles(style)
export default class List extends React.Component {
  static pattern = new RegExp(/([A-Z]{2})([0-9]{4})([A-Z]{2})/, 'g');
  static propTypes = {
    fetch: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    plates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        allowed: PropTypes.bool.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
  };
  static defaultProps = {
    plates: [],
  };
  state = {
    newPlate: '',
    warning: false,
  };

  onAddNumberChange = ({ target }) => {
    this.setState(
      {
        newPlate: target.value.toUpperCase().slice(0, 8),
      },
      () =>
        this.setState({
          warning: !this.state.newPlate.replace(' ', '').match(List.pattern),
        }),
    );
  };

  addNumberToList = () => {
    if (!this.state.newPlate || this.state.warning) return;
    this.props.onAdd(this.state.newPlate);
    this.setState({ newPlate: '' });
  };

  render() {
    return (
      <div className={style.root}>
        <div className={style.container}>
          <p className={style.title}>Car license number plates white list</p>
          {this.props.plates.length > 0 ? (
            this.props.plates.map(plate => (
              <Plate
                {...plate}
                fetch={this.props.fetch}
                key={plate.id}
                onStatusChange={() =>
                  this.props.onStatusChange(plate.id, plate.allowed)
                }
              />
            ))
          ) : (
            <p>Empty white list</p>
          )}
        </div>
        <PlateInput
          warning={this.state.warning}
          onInput={this.onAddNumberChange}
          value={this.state.newPlate}
          onSubmit={this.addNumberToList}
        />
      </div>
    );
  }
}
