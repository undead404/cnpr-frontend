import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import PropTypes from 'prop-types';
import React from 'react';
import Link from 'components/Link';
import style from './Navigation.css';
import smartBoomGate2 from './smart_boom_gate2.png';

@withStyles(style)
export default class Navigation extends React.Component {
  render() {
    console.info('Navigation', this.props);
    const pathname = process.env.BROWSER && window.location.pathname;
    // const {
    //   location: { pathname },
    // } = this.props;
    // console.log('header mounted url')
    // console.log(this.props)

    return (
      <div className={style.root}>
        <img alt="CNPR" className={style.image} src={smartBoomGate2} />
        <Link
          className={cx(
            style.link,
            pathname === '/list' ? style.linkActive : undefined,
          )}
          to="/list"
        >
          White List
        </Link>
        <Link
          className={cx(
            style.link,
            pathname === '/recognition' ? style.linkActive : undefined,
          )}
          to="/recognition"
        >
          Recognition
        </Link>
        <Link
          className={cx(
            style.link,
            pathname === '/log' ? style.linkActive : undefined,
          )}
          to="/log"
        >
          Log&amp;s
        </Link>
        <Link
          className={cx(
            style.link,
            pathname === '/config' ? style.linkActive : undefined,
          )}
          to="/config"
        >
          Config
        </Link>
        <div />
      </div>
    );
  }
}
