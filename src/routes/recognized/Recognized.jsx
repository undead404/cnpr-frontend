import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Plate from './Plate';
import style from './Recognized.css';

@withStyles(style)
export default class Recognized extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plate: undefined,
    };
  }

  render() {
    // const { plate, confidence, dateTime, approved, id } = this.state;
    const { plate, confidence, dateTime, approved, region, id } = this.state;

    return (
      <div className={style.root}>
        {plate ? (
          <Plate number={plate} isInWhiteList={approved} />
        ) : (
          <span className={style.noPlatesMsg}>No plates found!</span>
        )}

        <div className={style.plateCard}>
          <span className={style.plateCardFirstSpan}>Detailed data:</span>
          <span>Date: {dateTime}</span>
          <span>Region: {region && region.toUpperCase()}</span>
          <span>ID: {id}</span>
          <span>Confidence: {confidence}</span>
          <span>
            Access:
            <span
              style={
                approved
                  ? style.plateApprovalMarkSuccess
                  : style.plateApprovalMarkFail
              }
            >
              {plate && (approved ? ' allowed' : ' denied')}
            </span>
          </span>
        </div>
      </div>
    );
  }
}
