/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/prop-types */
import React from 'react';
import block from 'bem-css-modules';
import styles from './PlayerDetails.module.scss';

const b = block(styles);

function PlayerDetails({ song }) {
  return (
    <div className={b()}>
      <div className={b('img')}>
        <img src={song.img_src} alt={`cover of ${song.artist} - ${song.artist}`} />
      </div>
      <h3 className={b('title')}>{song.title}</h3>
      <h4 className={b('artist')}>{song.artist}</h4>
    </div >
  );
}

export default PlayerDetails;
