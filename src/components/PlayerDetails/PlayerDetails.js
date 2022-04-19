/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/prop-types */
import React from 'react';
import styles from './PlayerDetails.module.scss';

function PlayerDetails({ song }) {
  return (
    <div className={styles.playerDetails}>
      <div className={styles.playerDetails__img}>
        <img src={song.img_src} alt={`cover of ${song.artist} - ${song.artist}`} />
      </div>
      <h3 className={styles.playerDetails__title}>{song.title}</h3>
      <h4 className={styles.playerDetails__artist}>{song.artist}</h4>
    </div>
  );
}

export default PlayerDetails;
