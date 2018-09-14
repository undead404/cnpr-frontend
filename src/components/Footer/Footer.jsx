import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Footer.css';
import ver2blue from './VER2-BLUE.png';

@withStyles(style)
export default class Footer extends React.Component {
  render() {
    return (
      <div className={style.root}>
        <div className={style.container}>
          <a
            href="https://www.eliftech.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img alt="ElifTech CPD" className={style.img} src={ver2blue} />
          </a>
        </div>
      </div>
    );
  }
}
