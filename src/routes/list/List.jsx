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
  constructor(props) {
    super(props);
    this.state = {
      newPlate: '',
      plates: this.props.plates,
      warning: false,
    };
  }

  onAddNumberChange = ({ target }) => {
    const newPlate = target.value
      .toUpperCase()
      .replace(' ', '')
      .slice(0, 8);
    this.setState({
      newPlate,
      warning: newPlate.match(List.pattern),
    });
  };

  setPlateAllowedness = async (plateId, value) => {
    console.info(
      `setPlateAllowedness(${plateId} : ${typeof plateId}, ${value})`,
    );
    const response = await this.props.fetch('/graphql', {
      body: JSON.stringify({
        query:
          'mutation setPlateAllowedness($id: Int!, $allowed: Boolean!){setPlateAllowedness(id: $id, allowed: $allowed){allowed,id,number}}',
        variables: {
          id: plateId,
          allowed: value,
        },
      }),
    });
    const data = await response.json();
    console.info(data);
    const plates = [...this.state.plates];
    // console.info(plates);
    plates.find(plate => plate.id === plateId).allowed =
      data.data.setPlateAllowedness.allowed;
    this.setState({
      plates,
    });
  };

  addPlate = async () => {
    if (!this.state.newPlate || this.state.warning) return;
    const response = await this.props.fetch('/graphql', {
      body: JSON.stringify({
        query:
          'mutation addPlate($number: String!){addPlate(number: $number){allowed,id,number}}',
        variables: {
          number: this.state.newPlate,
        },
      }),
    });
    const data = await response.json();
    console.info(data);
    this.setState({
      newPlate: '',
      plates: [...this.state.plates, data.data.addPlate],
    });
  };

  deletePlate = async plateId => {
    await this.props.fetch('/graphql', {
      body: JSON.stringify({
        query: 'mutation deletePlate($id: Int!){deletePlate(id: $id){id}}',
        variables: {
          id: plateId,
        },
      }),
    });
    this.setState({
      plates: this.state.plates.filter(plate => plate.id !== plateId),
    });
  };

  render() {
    return (
      <div className={style.root}>
        <div className={style.container}>
          <p className={style.title}>Car license number plates white list</p>
          {this.state.plates.length > 0 ? (
            this.state.plates.map(plate => (
              <Plate
                {...plate}
                key={plate.id}
                onDelete={this.deletePlate}
                onSetAllowedness={this.setPlateAllowedness}
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
          onSubmit={this.addPlate}
        />
      </div>
    );
  }
}
