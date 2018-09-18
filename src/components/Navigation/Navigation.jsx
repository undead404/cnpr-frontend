import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import Link from 'components/Link';
import style from './Navigation.css';
import smartBoomGate2 from './smart_boom_gate2.png';

@withStyles(style)
export default class Navigation extends React.Component {
  render() {
    const pathname = process.env.BROWSER && window.location.pathname;
    console.info('pathname', pathname);

    return (
      <div className={style.root}>
        <img alt="CNPR" className={style.image} src={smartBoomGate2} />
        <Link
          className={cx(
            style.link,
            pathname === '/' ? style.linkActive : undefined,
          )}
          to="/"
        >
          Logs
        </Link>
        <Link
          className={cx(
            style.link,
            pathname === '/list' ? style.linkActive : undefined,
          )}
          to="/list"
        >
          Plates
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
