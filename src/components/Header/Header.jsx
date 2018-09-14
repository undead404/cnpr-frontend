import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import Navigation from 'components/Navigation';
import style from './Header.css';

@withStyles(style)
export default class Header extends React.Component {
  render() {
    return (
      <div className={style.root}>
        <div>
          <Navigation />
        </div>
      </div>
    );
  }
}
